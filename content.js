(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* 1. RAINBOW ANIMATION */
        @keyframes rainbowFlow {
            0% { background-position: 0% 0%; }
            50% { background-position: 0% 100%; }
            100% { background-position: 0% 0%; }
        }

        div[jsname="xl07Ob"] {
            width: auto !important;
            min-width: 140px !important;
            max-width: 450px !important; 
            height: auto !important;
            max-height: none !important; 
            overflow: visible !important;
            transition: none !important;
            isolation: isolate !important;
            padding-bottom: 5px;
        }

        /* 2. TEXT COLOR + CHECKMARK FIX */
        .custom-size-item a {
            display: block;
            width: 100%;
            padding-right: 52px !important; 
            padding-left: 10px;
            box-sizing: border-box;
            line-height: 37px;
            text-decoration: none !important;
            font-weight: 700;
            white-space: nowrap !important;
            
            background: linear-gradient(
                to bottom, 
                #ffc107, #f73939, #2196f3, #43a047, #ffc107
            );
            background-size: 100% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: rainbowFlow 8s ease infinite;
        }

        .custom-size-item {
            white-space: nowrap !important;
            width: 100% !important;
        }

        .custom-size-item:hover {
            background-color: rgba(60, 64, 67, .08) !important;
        }

        .Wf7Nsf .Urm71 {
            overflow: visible !important;
        }
    `;
    document.head.appendChild(style);

    // EASTER EGG: Targeting ONLY the specific span you provided
    const applyEasterEgg = () => {
        const aiSpans = document.querySelectorAll('span.R1QWuf');
        aiSpans.forEach(span => {
            if (span.innerText === 'AI Mode' || span.innerText === 'AI Overview') {
                span.innerText = 'AI Slop';
            }
        });
    };

    const injectSizes = (menu) => {
        const items = Array.from(menu.querySelectorAll('a, div'));
        const hasLarge = items.some(el => el.textContent === 'Large');
        const isAlreadyInjected = menu.querySelector('.custom-size-item');
        const isMainToolsMenu = items.some(el => el.textContent === 'Advanced Search');

        if (!hasLarge || isAlreadyInjected || isMainToolsMenu) return;

        const currentTbs = new URLSearchParams(window.location.search).get('tbs') || '';
        const isAnyCustomActive = currentTbs.includes('islt:');

        if (isAnyCustomActive) {
            menu.querySelectorAll('.Wf7Nsf').forEach(el => el.classList.remove('Wf7Nsf'));
        }

        const extraSizes = [
            { label: 'Larger than 2 MP', val: 'isz:lt,islt:2mp' },
            { label: 'Larger than 4 MP', val: 'isz:lt,islt:4mp' },
            { label: 'Larger than 6 MP', val: 'isz:lt,islt:6mp' },
            { label: 'Larger than 8 MP', val: 'isz:lt,islt:8mp' },
            { label: 'Larger than 10 MP', val: 'isz:lt,islt:10mp' },
            { label: 'Larger than 12 MP', val: 'isz:lt,islt:12mp' },
            { label: 'Larger than 15 MP', val: 'isz:lt,islt:15mp' },
            { label: 'Larger than 20 MP', val: 'isz:lt,islt:20mp' },
            { label: 'Larger than 40 MP', val: 'isz:lt,islt:40mp' },
            { label: 'Larger than 70 MP', val: 'isz:lt,islt:70mp' }
        ];

        extraSizes.forEach(size => {
            const itemWrap = document.createElement('div');
            itemWrap.className = 'XhWQv sjVJQd rNHry custom-size-item';
            if (currentTbs.includes(size.val.split(',')[1])) itemWrap.classList.add('Wf7Nsf');
            
            const innerDiv = document.createElement('div');
            innerDiv.className = 'Urm71';
            
            const link = document.createElement('a');
            link.href = "#";
            link.innerText = size.label;

            itemWrap.onmouseenter = (e) => e.stopPropagation();
            itemWrap.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = new URL(window.location.href);
                url.searchParams.set('tbs', size.val);
                window.location.href = url.toString();
            };

            innerDiv.appendChild(link);
            itemWrap.appendChild(innerDiv);
            menu.appendChild(itemWrap);
        });
    };

    const observer = new MutationObserver((mutations) => {
        applyEasterEgg(); 
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === 1) {
                    const target = node.getAttribute?.('jsname') === 'xl07Ob' ? node : node.querySelector('[jsname="xl07Ob"]');
                    if (target) injectSizes(target);
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    applyEasterEgg(); 
})();