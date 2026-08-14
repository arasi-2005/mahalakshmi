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
            "Happy Birthday to my wonderful best friend! ❤️";
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