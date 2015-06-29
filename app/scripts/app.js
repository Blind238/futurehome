/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';
  /* global moment */
  /* global screenfull */

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  // app.displayInstalledToast = function() {
  //   document.querySelector('#caching-complete').show();
  // };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  moment.locale('nl');

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  app.nextSection = function() {
    switch (app.route) {
      case 'table-empty':
        app.route='table-oven';
        break;
      case 'table-oven':
        app.route='table-baking';
        app.startTimer();
        break;
      case 'table-baking':
        app.route='table-eggs';
        break;
      case 'table-eggs':
        app.route='table-boiling';
        break;
      case 'table-boiling':
        app.route='table-news';
        break;
      case 'table-news':
        app.route='table-mail';
        break;
      case 'table-mail':
        app.route='table-done';
        break;
      case 'table-done':
        app.route='table-still-warm';
        app.stopTimer();
        break;
      case 'table-still-warm':
        app.route='table-empty';
        app.toggleLogo();
        break;
      default:
    }
  };

  app.fullscreen = function(){
    if(screenfull.enabled){
      screenfull.toggle();
    }
  };

  var emptyTapStart;
  var emptyTapInterval;

  app.isMenuVisible = false;
  app.roundMenuX = 0;
  app.roundMenuY = 0;

  // TODO: Make it appear on tap up, else use will select the new element, turning the screen blue
  app.emptyTapDown = function(e){
    emptyTapStart = +moment();

    if(!app.isMenuVisible){
      app.roundMenuX = e.detail.x;
      app.roundMenuY = e.detail.y;
    }

    emptyTapInterval = window.setInterval( function()
    {
      if(emptyTapStart && +moment() - emptyTapStart > 400){
        app.isMenuVisible = true;
        clearSetInterval(emptyTapInterval);
      }
    }, 10);

  };

  app.emptyTapUp = function(){
    emptyTapStart = null;
    if(emptyTapInterval){
      clearSetInterval(emptyTapInterval);
    }
  };

  app.roundMenuTap = function(){
    app.nextSection();
    app.isMenuVisible = false;
    app.roundMenuX = 0;
    app.roundMenuY = 0;
  };

  app.timerCount = 0;
  app.timerInterval = null;
  app.timerString = '';

  app.startTimer = function(){
    app.timer = moment.duration(10, 'minutes');
    app.timerInterval = window.setInterval(function(){
      app.timer.subtract(1, 'second');
      app.timerCount = 100 - (app.timer.asSeconds() / 6);
      app.timerString = '' + app.timer.minutes() + ':' + app.timer.seconds();
      if (app.timer.asSeconds() === 0){
        app.stopTimer();
      }
    },1000);

    document.querySelector('.timer-progress').style.display = 'block';
  };

  app.stopTimer = function(){
    clearInterval(app.timerInterval);
    app.timerCount = 0;
    app.timerString = '';
    document.querySelector('.timer-progress').style.display = 'none';
  };

  function clearSetInterval(reference){
    window.clearInterval(reference);
    reference = null;
  }

  app.toggleLogo = function(){
    document.querySelector('.table-logo').classList.toggle('off');
  };

  window.oncontextmenu = function(){
    return false;
  };

})(document);
