import '@/scss/main';

import(
/* webpackPrefetch: true */
  '@/js/home'
);

if (module.hot) {
  module.hot.accept('@/js/home', () => {
    console.log('更新了');
  });
}
