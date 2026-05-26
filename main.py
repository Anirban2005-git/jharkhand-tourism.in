from typing import Optional, List
from fastapi import FastAPI, Depends, HTTPException, Form, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from contextlib import asynccontextmanager
from sqlalchemy import or_
import razorpay
import os


# ================================
# CONFIG
# ================================

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

DATABASE_URL = "sqlite:////tmp/tourism.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)


# ================================
# DB MODELS
# ================================

class Attraction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None
    historical_background: Optional[str] = None
    scenic_spots: Optional[str] = None
    nearby_restaurants_hotels: Optional[str] = None
    entry_fee: Optional[str] = None
    food_cost_range: Optional[str] = None
    travel_cost_estimate: Optional[str] = None
    stay_cost_per_night: Optional[str] = None
    best_time_visit: Optional[str] = None


class TouristBooking(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tourist_name: str = Field(index=True)
    email: str = Field(index=True)
    package: str
    amount: float
    currency: str = "INR"
    order_id: str = Field(unique=True)
    payment_id: Optional[str] = None
    status: str = "PENDING"


# ================================
# PYDANTIC MODELS
# ================================

class AttractionCreate(SQLModel):
    name: str
    description: Optional[str] = None
    historical_background: Optional[str] = None
    scenic_spots: Optional[str] = None
    nearby_restaurants_hotels: Optional[str] = None
    entry_fee: Optional[str] = None
    food_cost_range: Optional[str] = None
    travel_cost_estimate: Optional[str] = None
    stay_cost_per_night: Optional[str] = None
    best_time_visit: Optional[str] = None


class AttractionRead(Attraction):
    pass


class AttractionUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    historical_background: Optional[str] = None
    scenic_spots: Optional[str] = None
    nearby_restaurants_hotels: Optional[str] = None
    entry_fee: Optional[str] = None
    food_cost_range: Optional[str] = None
    travel_cost_estimate: Optional[str] = None
    stay_cost_per_night: Optional[str] = None
    best_time_visit: Optional[str] = None


# ================================
# DB SESSION
# ================================

def get_session():
    with Session(engine) as session:
        yield session


# ================================
# SEED DATA
# ================================

def seed_data():

    sample = [
        {
            "name": "Baba Baidyanath Temple, Deoghar",
            "description": "One of the 12 Jyotirlingas",
            "historical_background": "Ancient Shiva temple",
            "scenic_spots": "Nandan Pahar",
            "nearby_restaurants_hotels": "Hotel Satyam",
            "entry_fee": "₹60",
            "food_cost_range": "150-400",
            "travel_cost_estimate": "500-1500",
            "stay_cost_per_night": "600-1200",
            "best_time_visit": "Oct-Feb"
        }
    ]

    with Session(engine) as session:

        existing = session.exec(
            select(Attraction)
        ).first()

        if not existing:

            for item in sample:
                session.add(Attraction(**item))

            session.commit()


# ================================
# APP LIFESPAN
# ================================

@asynccontextmanager
async def lifespan(app: FastAPI):

    try:
        SQLModel.metadata.create_all(engine)
        seed_data()
        print("Database initialized")

    except Exception as e:
        print(f"Database startup error: {e}")

    yield


# ================================
# APP
# ================================

app = FastAPI(
    title="Jharkhand Tourism API",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ================================
# Razorpay
# ================================

razorpay_client = None

if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET:
    razorpay_client = razorpay.Client(
        auth=(
            RAZORPAY_KEY_ID,
            RAZORPAY_KEY_SECRET
        )
    )


# ================================
# ROUTES
# ================================

@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "Jharkhand Tourism API running"
    }


@app.get(
    "/attractions",
    response_model=List[AttractionRead]
)
def get_attractions(
    q: Optional[str] = Query(None),
    db: Session = Depends(get_session)
):

    statement = select(Attraction)

    if q:
        statement = statement.where(
            or_(
                Attraction.name.contains(q),
                Attraction.description.contains(q)
            )
        )

    return db.exec(statement).all()


@app.post("/create_order")
async def create_order(
    tourist_name: str = Form(...),
    email: str = Form(...),
    package: str = Form(...),
    amount: float = Form(...),
    db: Session = Depends(get_session)
):

    if razorpay_client is None:
        raise HTTPException(
            status_code=500,
            detail="Razorpay keys not configured"
        )

    amount_paise = int(amount * 100)

    try:

        order = razorpay_client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "payment_capture": 1
        })

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    booking = TouristBooking(
        tourist_name=tourist_name,
        email=email,
        package=package,
        amount=amount,
        order_id=order["id"]
    )

    db.add(booking)
    db.commit()

    return {
        "order_id": order["id"],
        "amount": amount_paise,
        "currency": "INR",
        "key": RAZORPAY_KEY_ID
    }


@app.post("/verify_payment")
async def verify_payment(
    request: Request
):

    if razorpay_client is None:
        raise HTTPException(
            status_code=500,
            detail="Razorpay keys not configured"
        )

    data = await request.json()

    try:

        razorpay_client.utility.verify_payment_signature({
            "razorpay_order_id":
            data["razorpay_order_id"],

            "razorpay_payment_id":
            data["razorpay_payment_id"],

            "razorpay_signature":
            data["razorpay_signature"]
        })

    except razorpay.errors.SignatureVerificationError:

        raise HTTPException(
            status_code=400,
            detail="Invalid payment signature"
        )

    return {
        "status": "success",
        "message": "Payment verified"
    }