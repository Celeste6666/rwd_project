// menu
document.querySelector('.menu')
  .addEventListener('pointerup', (e) => {
    const target = e.target.parentElement;
    console.log(target);
    console.log(target.classList);
    if (target.classList.contains('menu-btn')) {
      document.querySelector('.menu-list').classList.add('isActive');
    } else if (target.classList.contains('menu-close-btn')) {
      document.querySelector('.menu-list').classList.remove('isActive');
    } else if (target.classList.contains('menu-list-item')) {
      document.querySelector('.menu-list').classList.remove('isActive');
    }
  });

// 換背景色
document.querySelector('.theme-toggle')
  .addEventListener('pointerup', (e) => {
    const { target } = e;
    console.log(target);
    console.log(target.classList);
    if (target.classList.contains('fa-moon')) {
      document.querySelector('body').classList.add('dark-theme');
    } else if (target.classList.contains('fa-sun')) {
      document.querySelector('body').classList.remove('dark-theme');
    }
    target.classList.toggle('fa-moon');
    target.classList.toggle('fa-sun');
  });
