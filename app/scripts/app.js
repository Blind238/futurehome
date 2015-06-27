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
        app.route='table-info';
        break;
      case 'table-info':
        app.route='table-prep';
        break;
      case 'table-prep':
        app.route='table-cook';
        break;
      case 'table-cook':
        app.route='table-empty';
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

  app.emptyTapUp = function(e){
    emptyTapStart = null;
    if(emptyTapInterval){
      clearSetInterval(emptyTapInterval);
    }
  };

  app.roundMenuTap = function(e){
    app.isMenuVisible = false;
    app.roundMenuX = 0;
    app.roundMenuY = 0;
  }

  function clearSetInterval(reference){
    window.clearInterval(reference);
    reference = null;
  }

})(document);
