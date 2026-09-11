const portfolioData = [
  // === Puzzle & logic ===
  { title: "Farm Match", category: "Puzzle & logic", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/farm-match" },
  { title: "Candy Crush", category: "Puzzle & logic", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/candy-crush" },
  { title: "Block Puzzle & logic", category: "Puzzle & logic", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/block-puzzle" },
  { title: "Jewel Blast", category: "Puzzle & logic", mechanic: "match3", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/jewel-blast" },
  { title: "Gem Drop", category: "Puzzle & logic", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/gem-drop" },
  { title: "Logic Blocks", category: "Puzzle & logic", mechanic: "match3", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/logic-blocks" },
  { title: "Color Sort", category: "Puzzle & logic", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/color-sort" },
  { title: "Tile Master", category: "Puzzle & logic", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/tile-master" },
  { title: "Brain Teaser", category: "Puzzle & logic", mechanic: "match3", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/brain-teaser" },
  { title: "Crystal Connect", category: "Puzzle & logic", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/crystal-connect" },

  // === Casual & hyper casual ===
  { title: "Merge Dragons", category: "Casual & hyper casual", mechanic: "merge", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/merge-dragons" },
  { title: "Idle Farm", category: "Casual & hyper casual", mechanic: "merge", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/idle-farm" },
  { title: "Bubble Pop", category: "Casual & hyper casual", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/bubble-pop" },
  { title: "Merge Mansion", category: "Casual & hyper casual", mechanic: "merge", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/merge-mansion" },
  { title: "Tap Tap Heroes", category: "Casual & hyper casual", mechanic: "merge", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/tap-tap-heroes" },
  { title: "Candy Swipe", category: "Casual & hyper casual", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/candy-swipe" },
  { title: "Idle Miner", category: "Casual & hyper casual", mechanic: "merge", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/idle-miner" },
  { title: "Bubble Shooter", category: "Casual & hyper casual", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/bubble-shooter" },
  { title: "Merge Cats", category: "Casual & hyper casual", mechanic: "merge", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/merge-cats" },
  { title: "Relax Puzzle", category: "Casual & hyper casual", mechanic: "merge", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/relax-puzzle" },

  // === Brand & physical products ===
  { title: "Hidden City", category: "Brand & physical products", mechanic: "hidden", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/hidden-city" },
  { title: "Mystery Manor", category: "Brand & physical products", mechanic: "hidden", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/mystery-manor" },
  { title: "Treasure Hunt", category: "Brand & physical products", mechanic: "sort", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/treasure-hunt" },
  { title: "Lost Temple", category: "Brand & physical products", mechanic: "hidden", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/lost-temple" },
  { title: "Jungle Quest", category: "Brand & physical products", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/jungle-quest" },
  { title: "Pirate Cove", category: "Brand & physical products", mechanic: "hidden", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/pirate-cove" },
  { title: "Ancient Ruins", category: "Brand & physical products", mechanic: "hidden", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/ancient-ruins" },
  { title: "Desert Explorer", category: "Brand & physical products", mechanic: "sort", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/desert-explorer" },
  { title: "Secret Island", category: "Brand & physical products", mechanic: "hidden", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/secret-island" },
  { title: "Mountain Climb", category: "Brand & physical products", mechanic: "hidden", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/mountain-climb" },

  // === RPG & strategy ===
  { title: "Solitaire", category: "RPG & strategy", mechanic: "pairs", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/solitaire" },
  { title: "Poker Stars", category: "RPG & strategy", mechanic: "pairs", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/poker-stars" },
  { title: "Blackjack Pro", category: "RPG & strategy", mechanic: "pairs", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/blackjack-pro" },
  { title: "Card Sort", category: "RPG & strategy", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/card-sort" },
  { title: "Uno Blast", category: "RPG & strategy", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/uno-blast" },
  { title: "Spider Solitaire", category: "RPG & strategy", mechanic: "pairs", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/spider-solitaire" },
  { title: "Memory Match", category: "RPG & strategy", mechanic: "pairs", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/memory-match" },
  { title: "Texas Holdem", category: "RPG & strategy", mechanic: "pairs", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/texas-holdem" },
  { title: "Card Castle", category: "RPG & strategy", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/card-castle" },
  { title: "Royal Flush", category: "RPG & strategy", mechanic: "pairs", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/royal-flush" },

  // === Video & audio ===
  { title: "Word Cookies", category: "Video & audio", mechanic: "pairs", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/word-cookies" },
  { title: "Crossword King", category: "Video & audio", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/crossword-king" },
  { title: "Word Connect", category: "Video & audio", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/word-connect" },
  { title: "Letter Fall", category: "Video & audio", mechanic: "pairs", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/letter-fall" },
  { title: "Word Search Pro", category: "Video & audio", mechanic: "puzzle", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/word-search-pro" },
  { title: "Anagram Master", category: "Video & audio", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/anagram-master" },
  { title: "Word Scramble", category: "Video & audio", mechanic: "puzzle", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/word-scramble" },
  { title: "Daily Crossword", category: "Video & audio", mechanic: "puzzle", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/daily-crossword" },
  { title: "Word Tower", category: "Video & audio", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/word-tower" },
  { title: "Spell Bound", category: "Video & audio", mechanic: "puzzle", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/spell-bound" },

  // === Casino & gambling ===
  { title: "RPG Quest", category: "Casino & gambling", mechanic: "sort", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/rpg-quest" },
  { title: "Dragon Slayer", category: "Casino & gambling", mechanic: "match3", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/dragon-slayer" },
  { title: "Hero's Journey", category: "Casino & gambling", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/heros-journey" },
  { title: "Dungeon Crawl", category: "Casino & gambling", mechanic: "sort", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/dungeon-crawl" },
  { title: "Magic Tower", category: "Casino & gambling", mechanic: "puzzle", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/magic-tower" },
  { title: "Knight's Honor", category: "Casino & gambling", mechanic: "match3", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/knights-honor" },
  { title: "Elf Archer", category: "Casino & gambling", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/elf-archer" },
  { title: "Dark Souls Lite", category: "Casino & gambling", mechanic: "puzzle", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/dark-souls-lite" },
  { title: "Castle Defense", category: "Casino & gambling", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/castle-defense" },
  { title: "Legend of Heroes", category: "Casino & gambling", mechanic: "sort", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/legend-of-heroes" },

  // === Sports & racing ===
  { title: "Casino Slots", category: "Sports & racing", mechanic: "match3", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/casino-slots" },
  { title: "Vegas Night", category: "Sports & racing", mechanic: "pairs", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/vegas-night" },
  { title: "Roulette Master", category: "Sports & racing", mechanic: "sort", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/roulette-master" },
  { title: "Lucky Dice", category: "Sports & racing", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/lucky-dice" },
  { title: "Jackpot Spin", category: "Sports & racing", mechanic: "pairs", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/jackpot-spin" },
  { title: "Poker Royale", category: "Sports & racing", mechanic: "pairs", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/poker-royale" },
  { title: "Slot Machine Deluxe", category: "Sports & racing", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/slot-machine-deluxe" },
  { title: "Baccarat Pro", category: "Sports & racing", mechanic: "sort", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/baccarat-pro" },
  { title: "Wheel of Fortune", category: "Sports & racing", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/wheel-of-fortune" },
  { title: "High Roller", category: "Sports & racing", mechanic: "match3", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/high-roller" },

  // === Arcade & action ===
  { title: "Racing Pro", category: "Arcade & action", mechanic: "puzzle", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/racing-pro" },
  { title: "Soccer Stars", category: "Arcade & action", mechanic: "sort", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/soccer-stars" },
  { title: "Basketball Shoot", category: "Arcade & action", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/basketball-shoot" },
  { title: "Golf Master", category: "Arcade & action", mechanic: "puzzle", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/golf-master" },
  { title: "Tennis Ace", category: "Arcade & action", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/tennis-ace" },
  { title: "Football Manager", category: "Arcade & action", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/football-manager" },
  { title: "Skateboard King", category: "Arcade & action", mechanic: "sort", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/skateboard-king" },
  { title: "Bowling Strike", category: "Arcade & action", mechanic: "puzzle", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/bowling-strike" },
  { title: "Drift Racing", category: "Arcade & action", mechanic: "match3", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/drift-racing" },
  { title: "Olympic Dash", category: "Arcade & action", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/olympic-dash" },

  // === Words & quiz ===
  { title: "Arcade Shooter", category: "Words & quiz", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/arcade-shooter" },
  { title: "Ninja Jump", category: "Words & quiz", mechanic: "puzzle", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/ninja-jump" },
  { title: "Space Invaders", category: "Words & quiz", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/space-invaders" },
  { title: "Pac-Man Clone", category: "Words & quiz", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/pac-man-clone" },
  { title: "Brick Breaker", category: "Words & quiz", mechanic: "puzzle", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/brick-breaker" },
  { title: "Snake Classic", category: "Words & quiz", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/snake-classic" },
  { title: "Flappy Fly", category: "Words & quiz", mechanic: "puzzle", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/flappy-fly" },
  { title: "Tetris Block", category: "Words & quiz", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/tetris-block" },
  { title: "Pinball Wizard", category: "Words & quiz", mechanic: "sort", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/pinball-wizard" },
  { title: "Retro Racer", category: "Words & quiz", mechanic: "puzzle", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/retro-racer" },

  // === Cards ===
  { title: "Brand Match", category: "Cards", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/brand-match" },
  { title: "Logo Quiz", category: "Cards", mechanic: "puzzle", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/logo-quiz" },
  { title: "Product Sort", category: "Cards", mechanic: "sort", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/product-sort" },
  { title: "Cola Challenge", category: "Cards", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/cola-challenge" },
  { title: "Sneaker Drop", category: "Cards", mechanic: "puzzle", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/sneaker-drop" },
  { title: "Car Brand Guess", category: "Cards", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/car-brand-guess" },
  { title: "Fast Food Frenzy", category: "Cards", mechanic: "match3", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/fast-food-frenzy" },
  { title: "Tech Gadget Match", category: "Cards", mechanic: "puzzle", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/tech-gadget-match" },
  { title: "Fashion Sort", category: "Cards", mechanic: "sort", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/fashion-sort" },
  { title: "Movie Poster Match", category: "Cards", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/movie-poster-match" },

  // === Adventure ===
  { title: "Interactive Ad", category: "Adventure", mechanic: "puzzle", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/interactive-ad" },
  { title: "Video Quiz", category: "Adventure", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/video-quiz" },
  { title: "Movie Trivia", category: "Adventure", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/movie-trivia" },
  { title: "Streamer Challenge", category: "Adventure", mechanic: "puzzle", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/streamer-challenge" },
  { title: "Clip Sort", category: "Adventure", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/clip-sort" },
  { title: "Music Video Match", category: "Adventure", mechanic: "match3", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/music-video-match" },
  { title: "TV Show Guess", category: "Adventure", mechanic: "puzzle", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/tv-show-guess" },
  { title: "Viral Video Sort", category: "Adventure", mechanic: "sort", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/viral-video-sort" },
  { title: "Cinema Puzzle", category: "Adventure", mechanic: "puzzle", dimension: "3d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/viral-video-sort" },
  { title: "Director's Cut", category: "Adventure", mechanic: "match3", dimension: "2d", image: "assets/img/portfolio/ex_slider.png", link: "https://mraid.io/projects/directors-cut" }
];

class PortfolioSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.cardsPerView = 6;
        
        // 1. Загружаем все данные
        this.allProjects = portfolioData; 
        
        // 2. Динамическое извлечение уникальных значений
        this.uniqueCategories = [...new Set(this.allProjects.map(p => p.category))];
        this.uniqueMechanics = [...new Set(this.allProjects.map(p => p.mechanic))];
        this.uniqueDimensions = [...new Set(this.allProjects.map(p => p.dimension))];

        // 3. Устанавливаем фильтры по умолчанию (первые из списка)
        this.currentCategory = this.uniqueCategories[0];
        this.currentMechanic = this.uniqueMechanics[0];
        this.currentDimension = this.uniqueDimensions[0];

        // 4. ВАЖНО: Сразу фильтруем массив по этим дефолтным значениям!
        this.filteredProjects = this.allProjects.filter(p => 
            p.category === this.currentCategory &&
            p.mechanic === this.currentMechanic &&
            p.dimension === this.currentDimension
        );
    }

    connectedCallback() {
        // Просто рендерим, данные уже загружены
        this.renderSlider();
    }

    // === АНИМИРОВАННАЯ ФИЛЬТРАЦИЯ ===
    applyFilters() {
        this.filteredProjects = this.allProjects.filter(p => 
            p.category === this.currentCategory &&
            p.mechanic === this.currentMechanic &&
            p.dimension === this.currentDimension
        );

        const track = this.shadowRoot.querySelector('.slider-track');
        const cards = track ? track.querySelectorAll('.slider-card') : [];

        if (cards.length === 0) {
            this.renderCards();
            this.renderDots();
            this.currentIndex = 0;
            setTimeout(() => this.updateSlider(), 50);
            return;
        }

        cards.forEach(card => card.classList.add('fade-out'));

        setTimeout(() => {
            this.currentIndex = 0;
            this.renderCards();
            this.renderDots();

            const newCards = this.shadowRoot.querySelectorAll('.slider-card');
            newCards.forEach(card => {
                card.classList.add('fade-in');
                void card.offsetWidth; 
                card.classList.remove('fade-in');
            });

            this.updateSlider();
        }, 400);
    }

    renderCards() {
        const track = this.shadowRoot.querySelector('.slider-track');
        if (!track) return;

        if (this.filteredProjects.length === 0) {
            track.innerHTML = '<p style="color:#888; padding:40px; width:100%; text-align:center;">No projects match these filters.</p>';
            return;
        }

        track.innerHTML = this.filteredProjects.map((p, i) => `
            <div class="slider-card" data-index="${i}" data-link="${p.link}">
                <div class="card-image">
                    <img src="${p.image}" alt="${p.title}">
                </div>
                <div class="card-info">
                    <span class="card-title">${p.title}</span>
                    <span class="card-category">${p.dimension.toUpperCase()} • ${this.formatLabel(p.mechanic)}</span>
                </div>
            </div>
        `).join('');
    }

    renderDots() {
        const dotsContainer = this.shadowRoot.querySelector('.slider-dots');
        if (!dotsContainer) return;
        dotsContainer.innerHTML = this.generateDots();
    }

    formatLabel(id) {
        return id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ');
    }

    renderSlider() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/portfolio/components/css/portfolioSlider.css">
            <section class="portfolio-slider-section">
                <div class="slider-header">
                    <div class="header-left"><h2>Portfolio & Solutions</h2></div>
                    <div class="header-right"><p>Explore our playables, choose the right format for your campaign and find a solution that fits your needs</p></div>
                </div>
                <div class="filter-section">
                    <div class="filter-group">
                            <span class="filter-label">
                                <img src="assets/img/portfolio/categories.png" alt="Categories" class="filter-icon">
                                Categories
                            </span>
                        <div class="filter-buttons">
                            ${this.uniqueCategories.map(cat => `
                                <button class="filter-btn ${cat === this.currentCategory ? 'active' : ''}" data-type="category" data-value="${cat}">
                                    ${this.formatLabel(cat)}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    <hr class="line-after-categories"/>
                    <div class="filter-row">
                        <div class="filter-group mechanics-group">
                                <span class="filter-label">
                                    <img src="assets/img/portfolio/mechanics.png" alt="Mechanics" class="filter-icon">
                                    Mechanics
                                </span>
                            <div class="filter-buttons">
                                ${this.uniqueMechanics.map(mech => `
                                    <button class="filter-btn ${mech === this.currentMechanic ? 'active' : ''}" data-type="mechanic" data-value="${mech}">
                                        ${this.formatLabel(mech)}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <div class="filter-group dimension-group">
                            <span class="filter-label">&ensp;</span>
                            <div class="filter-buttons dimension-buttons">
                                ${this.uniqueDimensions.map(dim => `
                                    <button class="filter-btn dimension-btn ${dim === this.currentDimension ? 'active' : ''}" data-type="dimension" data-value="${dim}">
                                        ${dim.toUpperCase()}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="slider-container">
                    <button class="slider-btn prev-btn" aria-label="Previous">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                    <div class="slider-track-wrapper">
                        <div class="slider-track"></div>
                    </div>
                    <button class="slider-btn next-btn" aria-label="Next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                </div>
                <div class="slider-dots"></div>
            </section>
        `;

        this.initEvents();
        this.renderCards();
        this.renderDots();
        setTimeout(() => this.updateSlider(), 50);
    }

    generateDots() {
        const totalPages = Math.ceil(this.filteredProjects.length / this.cardsPerView);
        if (totalPages <= 1) return '';
        let dots = '';
        for (let i = 0; i < totalPages; i++) {
            dots += `<span class="dot ${i === 0 ? 'active' : ''}" data-page="${i}"></span>`;
        }
        return dots;
    }

    initEvents() {
        this.shadowRoot.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.classList.contains('active')) return;
                const type = e.target.dataset.type;
                const value = e.target.dataset.value;
                const group = e.target.closest('.filter-buttons');
                
                group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                if (type === 'category') this.currentCategory = value;
                if (type === 'mechanic') this.currentMechanic = value;
                if (type === 'dimension') this.currentDimension = value;

                this.applyFilters();
            });
        });

        const prevBtn = this.shadowRoot.querySelector('.prev-btn');
        const nextBtn = this.shadowRoot.querySelector('.next-btn');

        prevBtn.addEventListener('click', () => {
            if (this.currentIndex > 0) { this.currentIndex--; this.updateSlider(); }
        });

        nextBtn.addEventListener('click', () => {
            const maxIndex = Math.max(0, Math.ceil(this.filteredProjects.length / this.cardsPerView) - 1);
            if (this.currentIndex < maxIndex) { this.currentIndex++; this.updateSlider(); }
        });

        this.shadowRoot.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                this.currentIndex = parseInt(e.target.dataset.page);
                this.updateSlider();
            }
        });

        window.addEventListener('resize', () => {
            this.updateCardsPerView();
            this.currentIndex = 0;
            this.renderSlider();
        });

        const track = this.shadowRoot.querySelector('.slider-track');
        if (track) {
            track.addEventListener('click', (e) => {
                // Ищем ближайшую карточку (на случай если кликнули на картинку или текст внутри)
                const card = e.target.closest('.slider-card');
                if (card) {
                    const link = card.dataset.link;
                    if (link && link !== '#') {
                        // Открываем ссылку в новой вкладке
                        window.open(link, '_blank');
                        
                        // Если хочешь открывать в ТОЙ ЖЕ вкладке, замени строку выше на:
                        // window.location.href = link;
                    }
                }
            });
        }
    }

    updateCardsPerView() {
        const width = window.innerWidth;
        if (width <= 768) this.cardsPerView = 2;
        else if (width <= 1024) this.cardsPerView = 3;
        else if (width <= 1440) this.cardsPerView = 4;
        else this.cardsPerView = 6;
    }

    updateSlider() {
        const track = this.shadowRoot.querySelector('.slider-track');
        const prevBtn = this.shadowRoot.querySelector('.prev-btn');
        const nextBtn = this.shadowRoot.querySelector('.next-btn');
        const dots = this.shadowRoot.querySelectorAll('.dot');

        if (!track || this.filteredProjects.length === 0) return;
        const card = track.querySelector('.slider-card');
        if (!card) return;

        const cardWidth = card.offsetWidth;
        const gap = 24;
        const offset = -(this.currentIndex * (cardWidth + gap));
        
        track.style.transform = `translateX(${offset}px)`;

        dots.forEach((dot, index) => dot.classList.toggle('active', index === this.currentIndex));

        const maxIndex = Math.max(0, Math.ceil(this.filteredProjects.length / this.cardsPerView) - 1);
        
        if (prevBtn) {
            prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
            prevBtn.style.pointerEvents = this.currentIndex === 0 ? 'none' : 'auto';
        }
        if (nextBtn) {
            nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.3' : '1';
            nextBtn.style.pointerEvents = this.currentIndex >= maxIndex ? 'none' : 'auto';
        }
    }
}

customElements.define('portfolio-slider', PortfolioSlider);