$(document).ready(function() {
    let words = [];
    let currentIndex = 0;
    let correct = 0;
    let wrong = 0;
    let total = 10;
    
    const $word = $('#card');
    const $input = $('#input');
    const $check = $('#check');
    const $message = $('#message');
    const $step = $('#step');
    const $correctEl = $('#correct');
    const $wrongEl = $('#wrong');
    const $modal = $('#modal');
    const $mCorrect = $('#m-correct');
    const $mWrong = $('#m-wrong');
    const $mTotal = $('#m-total');
    const $percent = $('#percent');
    const $level = $('#level');
    const $close = $('#close');
    const $closeBtn = $('.close');
    
    function loadWords() {
        words = [
            { original: "always", translation: "завжди" },
            { original: "book", translation: "книга" },
            { original: "computer", translation: "комп'ютер" },
            { original: "house", translation: "будинок" },
            { original: "water", translation: "вода" },
            { original: "friend", translation: "друг" },
            { original: "school", translation: "школа" },
            { original: "work", translation: "робота" },
            { original: "time", translation: "час" },
            { original: "day", translation: "день" },
            { original: "night", translation: "ніч" },
            { original: "week", translation: "тиждень" },
            { original: "month", translation: "місяць" },
            { original: "year", translation: "рік" },
            { original: "city", translation: "місто" }
        ];
        
        shuffleArray(words);
        words = words.slice(0, total);
        showNextWord();
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function showNextWord() {
        if (currentIndex < words.length) {
            $word.text(words[currentIndex].original);
            $input.val('');
            $message.text('').removeClass('correct incorrect');
            $step.text(`Слово ${currentIndex + 1} з ${words.length}`);
            $input.focus();
        } else {
            showResults();
        }
    }
    
    function checkTranslation() {
        const userAnswer = $input.val().trim().toLowerCase();
        const correctAnswer = words[currentIndex].translation.toLowerCase();
        
        if (userAnswer === '') {
            $message.text('Будь ласка, введіть переклад').addClass('incorrect');
            return;
        }
        
        if (userAnswer === correctAnswer) {
            $message.text('Вірно!').addClass('correct');
            correct++;
            $correctEl.text(correct);
        } else {
            $message.text(`Невірно! Правильно: "${words[currentIndex].translation}"`).addClass('incorrect');
            wrong++;
            $wrongEl.text(wrong);
        }
        
        currentIndex++;
        setTimeout(showNextWord, 1500);
    }
    
    function showResults() {
        const percent = Math.round((correct / total) * 100);
        
        $mCorrect.text(correct);
        $mWrong.text(wrong);
        $mTotal.text(total);
        $percent.text(percent + '%');
        
        let level = '';
        let levelClass = '';
        
        if (percent >= 90) {
            level = 'Відмінно! Ви добре знаєте ці слова.';
            levelClass = 'excellent';
        } else if (percent >= 70) {
            level = 'Добре! Але є ще що вдосконалювати.';
            levelClass = 'good';
        } else if (percent >= 50) {
            level = 'Задовільно. Потрібно більше практики.';
            levelClass = 'satisfactory';
        } else {
            level = 'Потрібно повторити слова.';
            levelClass = 'poor';
        }
        
        $level.text(level).addClass(levelClass);
        $modal.fadeIn(300);
    }
    
    function restart() {
        currentIndex = 0;
        correct = 0;
        wrong = 0;
        $correctEl.text('0');
        $wrongEl.text('0');
        $modal.hide();
        loadWords();
    }
    
    $check.on('click', checkTranslation);
    
    $input.on('keypress', function(e) {
        if (e.which === 13) {
            checkTranslation();
        }
    });
    
    $close.add($closeBtn).on('click', function() {
        restart();
    });
    
    $(window).on('click', function(e) {
        if ($(e.target).is($modal)) {
            restart();
        }
    });
    
    loadWords();
});