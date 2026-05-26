document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Set initial theme based on user preference or local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        html.classList.remove('dark');
        html.classList.add('light');
        updateThemeIcon('light');
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        updateThemeIcon('dark');
    }

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('.theme-icon');
        if (theme === 'light') {
            icon.innerHTML = `<path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM12 18.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75ZM5.06 17.594a.75.75 0 1 0-1.06-1.06l-1.59 1.59a.75.75 0 1 0 1.06 1.06l1.59-1.59ZM6.166 5.06a.75.75 0 0 0-1.06-1.061l-1.59 1.59a.75.75 0 0 0 1.061 1.06l1.59-1.59Z" />`;
        } else {
            icon.innerHTML = `<path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .151 1.026 10.973 10.973 0 0 0-2.296 2.052.75.75 0 0 1-.925-.152L3.864 2.256a.75.75 0 0 1 .15-1.025 11.14 11.14 0 0 0 4.363-2.614 36.586 36.586 0 0 1 1.151-.218l.058-.007.037.001a.75.75 0 0 1 .49.07Z" clip-rule="evenodd" />
            <path d="M14.25 5.25a5.25 5.25 0 0 0-10.5 0A5.25 5.25 0 0 0 14.25 5.25Zm-3.75 0a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            <path d="M20.25 14.5a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1 0-1.5h3a.75.75 0 0 1 .75.75ZM17.25 17.5a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .75.75ZM17.25 11.5a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .75.75Z" />`;
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            html.classList.add('light');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        } else {
            html.classList.remove('light');
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        }
    });

    const arVrModal = document.getElementById('ar-vr-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    
    const sites = {
        "Hundru Falls": "A spectacular cascade plunging from a height of 320 feet. This AR/VR experience offers a 360-degree view of the falls and the surrounding lush greenery.",
        "Baidyanath Dham": "An immersive journey into one of the most sacred pilgrimage sites. Explore the temple's intricate architecture and experience the divine atmosphere in 3D.",
        "Betla National Park": "Take a virtual safari through the lush forests of Palamu district, home to a diverse array of flora and fauna. This experience is designed for both AR and VR.",
        "Dassam Falls": "Discover the mesmerizing multi-layered cascade of Dassam Falls and the tranquil ambiance of its surroundings. A truly captivating natural spectacle.",
        "Parasnath Hill": "Embark on a virtual pilgrimage to Parasnath Hill, the highest peak in Jharkhand and a revered holy site for Jains. Take in the panoramic views and spiritual serenity.",
        "Netarhat": "Experience the serene beauty of the 'Queen of Chotanagpur' in a stunning virtual tour. Witness breathtaking sunrises and sunsets from the highest point of the plateau.",
        "Tribal Heritage Villages": "Step into the heart of Jharkhand's indigenous culture with a virtual tour of authentic tribal villages and their unique traditions.",
        "Rajrappa": "Visit the famous Chhinnamasta Temple at Rajrappa, a powerful Shakti Peeth. This virtual tour lets you explore the unique architecture and the scenic beauty of the river confluence."
    };

    // Event listeners for "Launch Experience" buttons
    document.querySelectorAll('.launch-ar-vr-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const siteName = event.target.dataset.site;
            const imageUrl = event.target.dataset.imageUrl;

            modalTitle.textContent = siteName;
            modalImage.src = imageUrl;
            modalDescription.textContent = sites[siteName] || "No description available.";
            arVrModal.style.display = 'flex';
        });
    });

    // Close modal functionality
    closeModalBtn.addEventListener('click', () => {
        arVrModal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === arVrModal) {
            arVrModal.style.display = 'none';
        }
    });
    
    document.addEventListener("DOMContentLoaded", function() {

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = {
        '#badge': 'Destinations',
        '#experiences': 'AI-Powered Smart Tourism', // Assuming experiences maps to this section
        '#marketplace': 'Local Marketplace',
        '#plan-trip': 'Start Your Jharkhand Adventure Today'
    };

    for (const [href, sectionTitle] of Object.entries(navLinks)) {
        const link = document.querySelector(`.nav-links a[href="${href}"]`);
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Find the section by looking for an element containing the title text
                const sections = Array.from(document.querySelectorAll('.section-title, .badge'));
                const targetSection = sections.find(el => el.textContent.includes(sectionTitle));
                
                if (targetSection) {
                    // Scroll to the parent section of the found title
                    targetSection.closest('section').scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                     console.warn(`Section with title "${sectionTitle}" not found for link ${href}`);
                }
            });
        }
    }

    // --- Registration Link Alert ---
    const registerLink = document.querySelector('a[href="#register"]');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert("Thank you for your interest! Please fill out our registration form to join the community.");
        });
    }

    // --- Browse Marketplace Button Alert ---
    const marketplaceBtn = document.querySelector('.marketplace-btn');
    if (marketplaceBtn) {
        marketplaceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert("Redirecting you to our authentic tribal crafts marketplace. Happy shopping!");
        });
    }

    // --- Explore Feature Buttons Alert ---
    const featureButtons = document.querySelectorAll('.btn-feature');
    featureButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Find the title of the feature card to provide a specific message
            const card = e.target.closest('.feature-card');
            const title = card ? card.querySelector('.card-title').textContent.trim() : "This amazing feature";
            alert(`The "${title}" experience is currently in development and will be launching soon. Stay tuned!`);
        });
    });

});

        // Simple slideshow functionality
        let slideIndex = 0;
        showSlides();

        function showSlides() {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}    
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex-1].style.display = "block";  
            // The dots don't actively change, they are decorative in this version
            setTimeout(showSlides, 4000); // Change image every 4 seconds
        }

        // Wait for the entire HTML document to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {

    // --- Hero Section Image Slideshow ---
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        const slides = document.getElementsByClassName("mySlides");
        if (slides.length === 0) return; // Don't run if there are no slides

        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Increment index and loop back to 1 if it goes beyond the number of slides
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        // Display the current slide
        slides[slideIndex - 1].style.display = "block";

        // Call the function again after 4 seconds
        setTimeout(showSlides, 4000);
    }


    // --- Smooth Scrolling for Navigation Links ---
    // Select all anchor links that start with '#'
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default instant jump

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // The magic for smooth scrolling
                    block: 'start'
                });
            }
        });
    });
    

    // --- Interactive Button Alerts ---
    // Note: The 'Register' and 'Login' links will navigate to their respective pages directly.
    
    // Alert for the "Connect with Locals" button in the CTA section
    const connectButton = document.querySelector('.btn-outline'); // Assuming this is the "Connect with Locals" button
    if (connectButton && connectButton.textContent.includes('Connect with Locals')) {
         connectButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert("Coming Soon: Our platform to connect you directly with verified local guides and communities!");
        });
    }

    // Alerts for all "Explore Feature" buttons
    const featureButtons = document.querySelectorAll('.btn-feature');
    featureButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = e.target.closest('.feature-card');
            const title = card ? card.querySelector('.card-title').textContent.trim() : "This amazing feature";
            alert(`The "${title}" experience is currently in development and will be launching soon. Stay tuned!`);
        });
    });

});

 // --- JavaScript for Interactive Elements ---

        // 1. Interest buttons in the planner
        const interestButtons = document.querySelectorAll('.interest-btn');
        interestButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('active');
            });
        });

        // 2. Dashboard tabs
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove 'active' class from all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add 'active' class to the clicked tab
                button.classList.add('active');
            });
        });
          document.addEventListener("DOMContentLoaded", function() {
            const mockFeedbackData = [
                { source: 'Platform Review', user: 'Anjali P.', comment: 'The guide at Dassam Falls was incredibly knowledgeable. Made the trip memorable!', sentiment: 'Positive' },
                { source: 'Twitter Mention', user: '@rohit_travels', comment: 'The road to Netarhat needs serious repairs. The journey was very uncomfortable.', sentiment: 'Negative' },
                { source: 'Platform Review', user: 'Vikram S.', comment: 'Booking a homestay in a tribal village was a seamless experience. The family was so welcoming.', sentiment: 'Positive' },
                { source: 'Facebook Comment', user: 'Priya Kumari', comment: 'Wish there were more dustbins near the Jonha Falls area. It was a bit littered.', sentiment: 'Negative' },
                { source: 'Platform Review', user: 'Amit K.', comment: 'The accommodation was as described. Everything was clean and tidy. No complaints.', sentiment: 'Neutral' },
                { source: 'Platform Review', user: 'Sunita M.', comment: 'The Sohrai art workshop was the highlight of our trip! An authentic and beautiful experience.', sentiment: 'Positive' }
            ];

            const feedbackFeedContainer = document.getElementById('feedback-feed');
            mockFeedbackData.forEach(item => {
                let sentimentClass = item.sentiment.toLowerCase();
                const feedbackItemHTML = `
                    <div class="feedback-item ${sentimentClass}">
                        <div class="feedback-header">
                            <div>
                                <p class="feedback-user">${item.user}</p>
                                <p class="feedback-source">${item.source}</p>
                            </div>
                            <span class="feedback-sentiment ${sentimentClass}">${item.sentiment}</span>
                        </div>
                        <p class="feedback-comment">${item.comment}</p>
                    </div>
                `;
                feedbackFeedContainer.innerHTML += feedbackItemHTML;
            });

            const commonChartOptions = {
                chart: { toolbar: { show: false }, zoom: { enabled: false }, },
                dataLabels: { enabled: false },
                stroke: { curve: 'smooth', width: 2 },
            };
            
            const sparklineOptions = {
                chart: { type: 'area', sparkline: { enabled: true } },
                stroke: { curve: 'smooth', width: 2 },
                fill: { opacity: 0.3 },
                yaxis: { min: 0 },
            };

            new ApexCharts(document.querySelector("#visitor-sparkline"), { ...sparklineOptions, series: [{ data: [30, 40, 35, 50, 49, 60, 70] }], colors: ['#3b82f6'] }).render();
            new ApexCharts(document.querySelector("#booking-sparkline"), { ...sparklineOptions, series: [{ data: [10, 15, 12, 18, 17, 22, 25] }], colors: ['#10b981'] }).render();
            new ApexCharts(document.querySelector("#revenue-sparkline"), { ...sparklineOptions, series: [{ data: [50, 45, 48, 42, 40, 35, 33] }], colors: ['#ef4444'] }).render();
            new ApexCharts(document.querySelector("#satisfaction-sparkline"), { ...sparklineOptions, series: [{ data: [4.5, 4.6, 4.5, 4.7, 4.6, 4.6, 4.6] }], colors: ['#a855f7'], yaxis: { min: 4, max: 5 } }).render();

            const trafficChartOptions = {
                ...commonChartOptions,
                chart: { ...commonChartOptions.chart, type: 'area', height: 350 },
                series: [{ name: 'Visitors', data: [230, 280, 450, 380, 550, 500, 700, 720, 680, 850, 800, 950] }],
                xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], labels: { style: { colors: '#64748b' } } },
                yaxis: { labels: { style: { colors: '#64748b' } } },
                fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 90, 100] } },
                tooltip: { x: { format: 'MMM' } },
                colors: ['#10b981']
            };
            new ApexCharts(document.querySelector("#tourist-traffic-chart"), trafficChartOptions).render();

            const destinationsChartOptions = {
                ...commonChartOptions,
                chart: { ...commonChartOptions.chart, type: 'bar', height: 350 },
                series: [{ name: 'Visits', data: [4500, 3800, 3200, 2900, 2500, 2100] }],
                xaxis: { categories: ['Ranchi', 'Netarhat', 'Betla', 'Deoghar', 'Parasnath', 'Hazaribagh'], labels: { style: { colors: '#64748b' } } },
                yaxis: { labels: { style: { colors: '#64748b' } } },
                plotOptions: { bar: { horizontal: false, borderRadius: 4, columnWidth: '45%' } },
                colors: ['#f97316'],
                tooltip: { y: { formatter: val => val + " visits" } }
            };
            new ApexCharts(document.querySelector("#popular-destinations-chart"), destinationsChartOptions).render();

            const sentimentChartOptions = {
                ...commonChartOptions,
                chart: { ...commonChartOptions.chart, type: 'donut', height: 350 },
                series: [75, 18, 7],
                labels: ['Positive', 'Negative', 'Neutral'],
                colors: ['#10b981', '#ef4444', '#94a3b8'],
                legend: { position: 'bottom', fontSize: '14px', markers: { radius: 12 }, labels: { colors: '#64748b' } },
                plotOptions: { pie: { donut: { labels: { show: true, total: { show: true, label: 'Total Reviews', color: '#64748b', formatter: w => w.globals.seriesTotals.reduce((a, b) => a + b, 0) } } } } }
            };
            new ApexCharts(document.querySelector("#sentiment-breakdown-chart"), sentimentChartOptions).render();
        });
});

        document.addEventListener("DOMContentLoaded", function() {
            const mockFeedbackData = [
                { source: 'Platform Review', user: 'Anjali P.', comment: 'The guide at Dassam Falls was incredibly knowledgeable. Made the trip memorable!', sentiment: 'Positive' },
                { source: 'Twitter Mention', user: '@rohit_travels', comment: 'The road to Netarhat needs serious repairs. The journey was very uncomfortable.', sentiment: 'Negative' },
                { source: 'Platform Review', user: 'Vikram S.', comment: 'Booking a homestay in a tribal village was a seamless experience. The family was so welcoming.', sentiment: 'Positive' },
                { source: 'Facebook Comment', user: 'Priya Kumari', comment: 'Wish there were more dustbins near the Jonha Falls area. It was a bit littered.', sentiment: 'Negative' },
                { source: 'Platform Review', user: 'Amit K.', comment: 'The accommodation was as described. Everything was clean and tidy. No complaints.', sentiment: 'Neutral' },
                { source: 'Platform Review', user: 'Sunita M.', comment: 'The Sohrai art workshop was the highlight of our trip! An authentic and beautiful experience.', sentiment: 'Positive' }
            ];

            const feedbackFeedContainer = document.getElementById('feedback-feed');
            mockFeedbackData.forEach(item => {
                let sentimentClass = item.sentiment.toLowerCase();
                const feedbackItemHTML = `
                    <div class="feedback-item ${sentimentClass}">
                        <div class="feedback-header">
                            <div>
                                <p class="feedback-user">${item.user}</p>
                                <p class="feedback-source">${item.source}</p>
                            </div>
                            <span class="feedback-sentiment ${sentimentClass}">${item.sentiment}</span>
                        </div>
                        <p class="feedback-comment">${item.comment}</p>
                    </div>
                `;
                feedbackFeedContainer.innerHTML += feedbackItemHTML;
            });

            const commonChartOptions = {
                chart: { toolbar: { show: false }, zoom: { enabled: false }, },
                dataLabels: { enabled: false },
                stroke: { curve: 'smooth', width: 2 },
            };
            
            const sparklineOptions = {
                chart: { type: 'area', sparkline: { enabled: true } },
                stroke: { curve: 'smooth', width: 2 },
                fill: { opacity: 0.3 },
                yaxis: { min: 0 },
            };

            new ApexCharts(document.querySelector("#visitor-sparkline"), { ...sparklineOptions, series: [{ data: [30, 40, 35, 50, 49, 60, 70] }], colors: ['#3b82f6'] }).render();
            new ApexCharts(document.querySelector("#booking-sparkline"), { ...sparklineOptions, series: [{ data: [10, 15, 12, 18, 17, 22, 25] }], colors: ['#10b981'] }).render();
            new ApexCharts(document.querySelector("#revenue-sparkline"), { ...sparklineOptions, series: [{ data: [50, 45, 48, 42, 40, 35, 33] }], colors: ['#ef4444'] }).render();
            new ApexCharts(document.querySelector("#satisfaction-sparkline"), { ...sparklineOptions, series: [{ data: [4.5, 4.6, 4.5, 4.7, 4.6, 4.6, 4.6] }], colors: ['#a855f7'], yaxis: { min: 4, max: 5 } }).render();

            const trafficChartOptions = {
                ...commonChartOptions,
                chart: { ...commonChartOptions.chart, type: 'area', height: 350 },
                series: [{ name: 'Visitors', data: [230, 280, 450, 380, 550, 500, 700, 720, 680, 850, 800, 950] }],
                xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], labels: { style: { colors: '#64748b' } } },
                yaxis: { labels: { style: { colors: '#64748b' } } },
                fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 90, 100] } },
                tooltip: { x: { format: 'MMM' } },
                colors: ['#10b981']
            };
            new ApexCharts(document.querySelector("#tourist-traffic-chart"), trafficChartOptions).render();

            const destinationsChartOptions = {
                ...commonChartOptions,
                chart: { ...commonChartOptions.chart, type: 'bar', height: 350 },
                series: [{ name: 'Visits', data: [4500, 3800, 3200, 2900, 2500, 2100] }],
                xaxis: { categories: ['Ranchi', 'Netarhat', 'Betla', 'Deoghar', 'Parasnath', 'Hazaribagh'], labels: { style: { colors: '#64748b' } } },
                yaxis: { labels: { style: { colors: '#64748b' } } },
                plotOptions: { bar: { horizontal: false, borderRadius: 4, columnWidth: '45%' } },
                colors: ['#f97316'],
                tooltip: { y: { formatter: val => val + " visits" } }
            };
            new ApexCharts(document.querySelector("#popular-destinations-chart"), destinationsChartOptions).render();

            const sentimentChartOptions = {
                ...commonChartOptions,
                chart: { ...commonChartOptions.chart, type: 'donut', height: 350 },
                series: [75, 18, 7],
                labels: ['Positive', 'Negative', 'Neutral'],
                colors: ['#10b981', '#ef4444', '#94a3b8'],
                legend: { position: 'bottom', fontSize: '14px', markers: { radius: 12 }, labels: { colors: '#64748b' } },
                plotOptions: { pie: { donut: { labels: { show: true, total: { show: true, label: 'Total Reviews', color: '#64748b', formatter: w => w.globals.seriesTotals.reduce((a, b) => a + b, 0) } } } } }
            };
            new ApexCharts(document.querySelector("#sentiment-breakdown-chart"), sentimentChartOptions).render();
        });

 