import '@/scss/main';
import '@/js/home';

if (module.hot) {
  module.hot.accept('@/js/home', () => {
    console.log('更新了');
  });
}
