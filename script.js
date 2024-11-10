window.addEventListener("load", function() {
    const preloader = document.querySelector(".preloader");
    preloader.style.display = "none"; // Скрываем прелоадер после загрузки страницы
});

(function(){
    var Memory = {
        timer: null,
        timeLeft: 300, // Время в секундах (5 минут)
        score: 0,
        timerStarted: false, // Убедимся, что таймер запускается только один раз

        init: function(cards){
            this.$game = $(".game");
            this.$modal = $(".modal");
            this.$overlay = $(".modal-overlay").hide(); // Скрываем overlay при инициализации
            this.$timerDisplay = $(".timer"); // Элемент для отображения таймера
            this.$scoreDisplay = $(".score"); // Элемент для отображения очков
            this.$claimButton = $(".claim").click(this.claimReward.bind(this));
            this.cardsArray = $.merge(cards, cards);
            this.shuffleCards(this.cardsArray);
            this.setup();
            this.updateTimerDisplay();
            this.updateScoreDisplay();
        },

        shuffleCards: function(cardsArray){
            this.$cards = $(this.shuffle(this.cardsArray));
        },

        setup: function(){
            this.html = this.buildHTML();
            this.$game.html(this.html);
            this.$memoryCards = $(".card");
            this.paused = false;
            this.guess = null;
            this.binding();
        },

        binding: function(){
            this.$memoryCards.on("click", this.cardClicked);
        },

        cardClicked: function(){
            var _ = Memory;
            var $card = $(this);

            // Проверяем, что игра не завершена и карточка еще не перевернута
            if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                // Запускаем таймер при первом клике на карточку
                if (!_.timerStarted) {
                    _.startTimer();
                    _.timerStarted = true;
                }

                // Переворачиваем карточку
                $card.find(".inside").addClass("picked");

                if (!_.guess) {
                    _.guess = $(this).attr("data-id");
                } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                    $(".picked").addClass("matched");
                    _.guess = null;
                    _.score += 500; // Начисляем 500 баллов за пару
                    _.updateScoreDisplay();
                    // Проверка, если все карточки открыты
                    if ($(".matched").length == $(".card").length) {
                        _.endGame(); // Завершаем игру, если все пары найдены
                    }
                } else {
                    _.guess = null;
                    _.paused = true;
                    setTimeout(function(){
                        $(".picked").removeClass("picked");
                        _.paused = false;
                    }, 600);
                }
            }
        },

        startTimer: function() {
            var _ = this;
            this.timer = setInterval(function() {
                _.timeLeft--;
                _.updateTimerDisplay();
                if (_.timeLeft <= 0) {
                    _.endGame();
                }
            }, 1000);
        },

        updateTimerDisplay: function() {
            var minutes = Math.floor(this.timeLeft / 60);
            var seconds = this.timeLeft % 60;
            if (seconds < 10) seconds = "0" + seconds;
            this.$timerDisplay.text("Время: " + minutes + ":" + seconds);
        },

        updateScoreDisplay: function() {
            this.$scoreDisplay.text("Очки: " + this.score);
        },

        endGame: function() {
            clearInterval(this.timer);
            this.showModal("Игра окончена!");
        },

        showModal: function(message) {
            this.paused = true;
            this.$overlay.css("display", "flex"); // Показываем overlay только при завершении игры
            this.$modal.find(".winner").text(message);
            this.$modal.find("#finalScore").text(this.score);
            this.$modal.fadeIn("slow");
            this.$game.fadeOut();
        },

        claimReward: function() {
            if (window.Telegram && Telegram.WebApp) {
                Telegram.WebApp.sendData(this.score.toString()); // Отправляем количество баллов в виде строки
                alert("Награда отправлена!");
            } else {
                alert("Telegram Web App не поддерживается.");
            }
        },

        shuffle: function(array){
            var counter = array.length, temp, index;
            while (counter > 0) {
                index = Math.floor(Math.random() * counter);
                counter--;
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },

        buildHTML: function(){
            var frag = '';
            this.$cards.each(function(k, v){
                frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
                <div class="front"><img src="'+ v.img +'"\
                alt="'+ v.name +'" /></div>\
                <div class="back"><img src="./img/caselock.webp"\
                alt="Codepen" /></div></div>\
                </div>';
            });
            return frag;
        }
    };

    // карточки
    var cards = [
        {	
			// название
			name: "AgentHop",
			// адрес картинки
			img: "./img/AgentHop.png",
			// порядковый номер пары
			id: 1,
		},
		{
			name: "Arvon",
			img: "./img/Arvon.png",
			id: 2
		},
		{
			name: "Beaston",
			img: "./img/Beaston.png",
			id: 3
		},
		{
			name: "DetectivePanda",
			img: "./img/DetectivePanda.png",
			id: 4
		}, 
		{
			name: "Dr.Beanie",
			img: "./img/Dr.Beanie.png",
			id: 5
		},
		{
			name: "Dreki",
			img: "./img/Dreki.png",
			id: 6
		},
		{
			name: "Falco",
			img: "./img/Falco.png",
			id: 7
		},
		{
			name: "Fang",
			img: "./img/Fang.png",
			id: 8
		},
		{
			name: "Finn",
			img: "./img/Finn.png",
			id: 9
		},
		{
			name: "Flash",
			img: "./img/Flash.png",
			id: 10
		},
		{
			name: "Hoot",
			img: "./img/Hoot.png",
			id: 11
		},
		{
			name: "Kactus",
			img: "./img/Kactus.png",
			id: 12
		},
		{
			name: "Moony",
			img: "./img/Moony.png",
			id: 13
		},
		{
			name: "Mr.Waggor",
			img: "./img/Mr.Waggor.png",
			id: 14
		},
		{
			name: "NightPanther",
			img: "./img/NightPanther.png",
			id: 15
		},
		{
			name: "Ottero",
			img: "./img/Ottero.png",
			id: 16
		},
		{
			name: "Pug",
			img: "./img/Pug.png",
			id: 17
		},
		{
			name: "Robo",
			img: "./img/Robo.png",
			id: 18
		},
		{
			name: "Rockie",
			img: "./img/Rockie.png",
			id: 19
		},
		{
			name: "SenseiTig",
			img: "./img/SenseiTig.png",
			id: 20
		},
		{
			name: "Shiba",
			img: "./img/Shiba.png",
			id: 21
		},
		{
			name: "SpiritFox",
			img: "./img/SpiritFox.png",
			id: 22
		},
		{
			name: "Yeti",
			img: "./img/Yeti.png",
			id: 23
		},
		{
			name: "Zasil",
			img: "./img/Zasil.png",
			id: 24
		},

	];

    Memory.init(cards);

})();

	