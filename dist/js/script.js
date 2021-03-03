window.addEventListener('DOMContentLoaded', () => {
    
    const centerBlock = document.querySelectorAll('.center__block');

    // Set quiz number
    function setQuizNumber() {
        document.querySelectorAll('.center__block').forEach((item, i) => {
            item.querySelector('.counter').textContent = i + 1;
            item.querySelector('.number').textContent = `№ ${i+1}.`;
        });
    }
    setQuizNumber();

    // Create addItem block
    const createElem = (i) => {
        const addItemBlock = document.createElement('div');
            addItemBlock.classList.add('add-item');
            addItemBlock.innerHTML = `
                <div class="add-item__divider"></div>
                <div class="add-item__circle">
                    <span class="plus">+</span>
                </div>
            `;
            centerBlock[i].after(addItemBlock);
    }

    // Adding to all center blocks addItems blocks 
    function createAddItemBlock() {
        for (let i = 0; i < centerBlock.length; i++) {
            createElem(i);
        }
    }
    createAddItemBlock();

    // Close frame after click the plus button
    const closeFrame = () => {
        const frame = document.querySelectorAll('.frame');
        frame.forEach(item => {
            item.remove();
        });
    }

    // Adding the center blocks by click a plus button
    const wrapper = document.querySelector('.center');
    wrapper.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('plus')) {

            const addItemBtn = document.querySelectorAll('.plus'),
                  addItemBlock = document.querySelectorAll('.add-item');
            
            closeFrame();

            addItemBtn.forEach((item, i) => {
                if (target == item) {
                    const cloneBlock = document.querySelectorAll('.center__block')[i].cloneNode(true);
                    addItemBlock[i].after(cloneBlock);
                    
                    const clonePlusBlock = addItemBlock[i].cloneNode(true); 
                    document.querySelectorAll('.center__block')[i+1].after(clonePlusBlock); 
                }
                    setQuizNumber();
                });
        }
    });

    // close frame by escape
    document.addEventListener('keydown', (e) => {
        const key = e.key || e.keyCode;
        if (key === 'Escape' || key === 'Esc' || key === 27) {
            closeFrame();
        }
    });

    // close frame by click the .content class (empty area)
    document.querySelector('.content').addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('content') || 
            target.classList.contains('rightblock') || 
            target.classList.contains('sidebar')) {
                closeFrame();
        }
    });

    // add frame 
    wrapper.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('center__block')) {

            const quizBlock = document.querySelectorAll('.center__block');

            quizBlock.forEach((item, i) => {
                if (e.target === item) {

                    closeFrame();

                    const frameBlock = document.createElement('div');
                    frameBlock.classList.add('frame');
                    frameBlock.innerHTML = `
                            <div class="frame__item" id="disable">Отключить</div>
                            <div class="frame__item" id="copy">Копировать</div>
                            <div class="frame__item" id="logic">Логика</div>
                            <div class="frame__item" id="move">Переместить</div>
                            <div class="frame__img" id="delete">
                                <img src="/icons/delete.svg" alt="Delete">
                            </div>
                    `;
                    item.prepend(frameBlock);

                    // scroll frame
                    const frame = document.querySelectorAll('.frame');
                    window.addEventListener('scroll', () => {
                        const bounding =  item.getBoundingClientRect();
                        
                        const blocksLength = quizBlock.length;

                        if (bounding.top < 100 && item.contains(frameBlock) && i + 1 < blocksLength) {
                            frame.forEach(item => {
                                item.remove();
                            });
                            quizBlock[i + 1].prepend(frameBlock);
                            quizBlock[i + 1].click();
                        } else if (bounding.top > 600 && item.contains(frameBlock)) {
                            frame.forEach(item => {
                                item.remove();
                            });
                            quizBlock[i - 1].prepend(frameBlock);
                            quizBlock[i - 1].click();
                        }
                    });

                    // move frame
                    const moveBtn = document.querySelector('#move');
                    if (moveBtn) {
                        moveBtn.addEventListener('click', () => {

                            closeFrame();

                            const frameBlock = document.createElement('div');
                            frameBlock.classList.add('frame', 'frame__move');
                            frameBlock.innerHTML = `
                                <div class="frame__item" id="up"><span class="arrow arrow__up"></span>Вверх</div>
                                <div class="frame__item" id="down"><span class="arrow arrow__down"></span>Вниз</div>
                                <div class="frame__item frame__item-green" id="confirm-move">Переместить</div>
                            `;
                            item.prepend(frameBlock);

                            // up down buttons
                            const upBtn = document.querySelector('#up'),
                                  downBtn = document.querySelector('#down'),
                                  confirmBtn = document.querySelector('#confirm-move');
                    
                            if (upBtn || downBtn || confirmMove) {

                                const plusBlock = document.querySelectorAll('.add-item');

                                // up button
                                upBtn.addEventListener('click', () => {
                                    if (i + 1 > 1) {
                                        
                                        const cloneBlock = item.cloneNode(true),
                                              clonePlus =  plusBlock[i].cloneNode(true);

                                        item.remove();
                                        plusBlock[i].remove();
                                        
                                        quizBlock[i-1].before(cloneBlock);
                                        cloneBlock.after(clonePlus);

                                        document.querySelectorAll('.center__block')[i-1].click();
                                        document.querySelector('#move').click();

                                        if (i + 1 > 2) {
                                            quizBlock[i-2].scrollIntoView(true);
                                        }
                                    }
                                });

                                // down button
                                downBtn.addEventListener('click', () => {
                                    if (i + 1 < quizBlock.length) {

                                        const cloneBlock = item.cloneNode(true),
                                              clonePlus =  document.querySelectorAll('.add-item')[i].cloneNode(true);

                                        item.remove();
                                        document.querySelectorAll('.add-item')[i].remove();
                                        
                                        document.querySelectorAll('.add-item')[i].after(cloneBlock);
                                        cloneBlock.after(clonePlus);

                                        document.querySelectorAll('.center__block')[i+1].click();
                                        document.querySelector('#move').click();

                                        document.querySelectorAll('.center__block')[i].scrollIntoView(true);
                                    }
                                });

                                // confirm button
                                confirmBtn.addEventListener('click', () => {
                                    closeFrame();
                                });
                            }
                        }); 
                    }                        
                }
            });
        }
    });

    // Consultant btn
    const consultBtn = document.querySelector('.consultant__btn'),
          consultBlock = document.querySelector('.rightblock');

    if (consultBtn) {
        consultBtn.addEventListener('click', () => {
            consultBlock.classList.toggle('rightblock-active');
        });
    }
});