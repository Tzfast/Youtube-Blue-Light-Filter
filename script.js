// ==UserScript==
// @name         Blue Light Filter YouTube Script
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Applies a blue light filter (yellow layer) over the player
// @author       https://github.com/Tzfast
// @match        https://*.youtube.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    
    let filterActive = false;

    
    function updateVideoFilter() {
        const video = document.querySelector('video');
        if (video) {
            if (filterActive) {
                
                video.style.filter = 'sepia(0.4) saturate(1.8) hue-rotate(-10deg)';
            } else {
                video.style.filter = 'none';
            }
        }
    }

    
    function injectFilter() {
        const rightControls = document.querySelector('.ytp-right-controls');

        
        if (rightControls && !document.getElementById('yt-yellow-filter-btn')) {

            
            const filterBtn = document.createElement('button');
            filterBtn.id = 'yt-yellow-filter-btn';
            filterBtn.className = 'ytp-button';
            filterBtn.title = 'Alternar Filtro Amarelo';

            
            filterBtn.innerHTML = `
                <svg viewBox="0 0 36 36" width="100%" height="100%" style="fill: #fff; scale: 0.65; transform: translateY(2px);">
                    <path d="M18,4C10.27,4,4,10.27,4,18s6.27,14,14,14,14-6.27,14-14S25.73,4,18,4Zm0,24A10,10,0,1,1,28,18,10,10,0,0,1,18,28Z" fill-opacity="0.7"/>
                    <path id="yt-filter-icon-core" d="M18,10a8,8,0,1,0,8,8A8,8,0,0,0,18,10Z" fill="#fff" style="display: none;"/>
                    <path d="M18,12a6,6,0,1,0,6,6A6,6,0,0,0,18,12Z" fill="#f39c12"/>
                </svg>
            `;

            
            filterBtn.addEventListener('click', function() {
                filterActive = !filterActive;

                const iconCore = document.getElementById('yt-filter-icon-core');
                if (filterActive) {
                    if (iconCore) iconCore.style.display = 'block';
                    filterBtn.title = 'Desativar Filtro Amarelo';
                } else {
                    if (iconCore) iconCore.style.display = 'none';
                    filterBtn.title = 'Ativar Filtro Amarelo';
                }

                updateVideoFilter();
            });

            
            rightControls.insertBefore(filterBtn, rightControls.firstChild);
        }

        
        updateVideoFilter();
    }

    
    const observer = new MutationObserver(() => {
        injectFilter();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
