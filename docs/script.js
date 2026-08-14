/* -------------------------
   Open Surprise
------------------------- */

function openSurprise() {

    document.getElementById("welcome")
        .style.display = "none";

    document.getElementById("mainContent")
        .classList.remove("hidden");

    startHearts();

    launchConfetti();

    loadBirthdayMessage();

    loadMemories();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* -------------------------
   Birthday Message
------------------------- */

async function loadBirthdayMessage() {

    try {

        const response =
            await fetch(`${API}/message`);

        const data =
            await response.json();

        if (data) {

            document.getElementById(
                "friendName"
            ).textContent =
                data.friendName;

            document.getElementById(
                "birthdayMessage"
            ).textContent =
                data.message;
        }

    } catch (error) {

        console.error(
            "Message loading failed:",
            error
        );

        document.getElementById(
            "birthdayMessage"
        ).textContent =
            "Happy Birthday to the person who came into my life as a stranger and slowly became a part of my heart. ❤️ When we first met during the bridge course, I never imagined that you would become such an important part of my life. From being just strangers in a bridge course, we became classmates, and then somehow we became bench partners—sharing notes, silly talks, endless laughs, little secrets, stupid jokes, and countless beautiful moments. Somewhere between all those ordinary college days and our never-ending conversations, you became my best friend—the person I can laugh with for absolutely no reason, share everything without hesitation, and trust with all my heart. Looking back, I feel incredibly lucky that life placed you beside me on that bench, because that simple seat gave me a friendship I never knew I needed. 🥹❤️ From a stranger to a classmate, a classmate to a bench partner, a bench partner to my best friend, and my best friend to my forever bestie—every step of this journey has become one of the most beautiful chapters of my life. You have seen my happiest moments, my craziest side, my silence, my worries, my mood swings, and all the little versions of me, and somehow you still chose to stay. And I want to say something from the deepest part of my heart—if I have ever hurt you, disappointed you, spoken harshly, or made you feel bad, even if it was never my intention, I am truly, truly sorry. 🥺❤️ Sometimes I may act silly or get angry over little things, but please never think that I don't care about you. You mean far more to me than my words could ever explain. All I ever want is for our friendship to remain stronger than any misunderstanding, stronger than any argument, and stronger than the little mistakes we may make along the way. 🫂❤️ No matter how much life changes, where we go, how busy we become, how far apart we may be, or how many years pass, I hope one thing never changes—us. I hope years from now, when we look back at these college days, we'll still laugh about our silly memories, remember the bench where our friendship grew, and say, “Look how far we've come.” 🥹❤️ Thank you for entering my life, for staying, for understanding me even when I don't say what's in my heart, for making ordinary days unforgettable, for being my happiness and comfort, and for becoming such a beautiful part of my story. You are not just someone I call my best friend anymore—you have become a piece of my life that I never want to lose, a person who feels like home, and family to my heart. ❤️  Happy Birthday, my bestie! 🎂❤️ You came into my life as a stranger, became my classmate, sat beside me as my favorite bench partner, turned into my best friend, became my safest place, and somewhere along the way, became family to my heart. No matter what happens, no matter where life takes us, and no matter how many chapters life writes after college, I hope our story always has a place for you and me. Because some people come into our lives for a moment, some for a season, but you are the person I want to keep in my life forever. 🫂❤️♾️ Today, tomorrow, and for all the years to come—you will always be my best friend, my forever bestie, and one of the most precious pieces of my heart. ❤️🥹";
    }
}


/* -------------------------
   Load Memories
------------------------- */

async function loadMemories() {

    try {

        const response =
            await fetch(`${API}/memories`);

        const memories =
            await response.json();

        const container =
            document.getElementById(
                "memoryContainer"
            );

        container.innerHTML = "";

        memories.forEach(memory => {

            const card =
                document.createElement("div");

            card.className =
                "memory-card";

            card.innerHTML = `

                <img src="${memory.imageUrl}"
                     alt="${memory.title}">

                <div class="memory-content">

                    <h3>
                        ${memory.title}
                    </h3>

                    <p>
                        ${memory.description}
                    </p>

                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {

        console.error(
            "Memory loading failed:",
            error
        );
    }
}


/* -------------------------
   Floating Hearts
------------------------- */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className = "heart";

    const hearts = [
        "❤️",
        "💕",
        "💖",
        "💗",
        "💓",
        "💞"
    ];

    heart.textContent =
        hearts[
            Math.floor(
                Math.random() * hearts.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    document
        .getElementById("hearts")
        .appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}


function startHearts() {

    setInterval(
        createHeart,
        500
    );
}


/* -------------------------
   Confetti
------------------------- */

function launchConfetti() {

    const canvas =
        document.getElementById(
            "confetti"
        );

    const ctx =
        canvas.getContext("2d");

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    const pieces = [];

    for (let i = 0; i < 150; i++) {

        pieces.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                -canvas.height,

            size:
                Math.random() * 8 + 3,

            speed:
                Math.random() * 5 + 2,

            rotation:
                Math.random() * 360
        });
    }

    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        pieces.forEach(piece => {

            piece.y += piece.speed;

            piece.rotation += 3;

            ctx.save();

            ctx.translate(
                piece.x,
                piece.y
            );

            ctx.rotate(
                piece.rotation *
                Math.PI / 180
            );

            ctx.fillStyle =
                "#ff4081";

            ctx.fillRect(
                0,
                0,
                piece.size,
                piece.size
            );

            ctx.restore();
        });

        requestAnimationFrame(
            animate
        );
    }

    animate();

    setTimeout(() => {

        canvas.style.display =
            "none";

    }, 7000);
}