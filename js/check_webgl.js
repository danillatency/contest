import WebGL from "three/addons/capabilities/WebGL.js"

if ( WebGL.isWebGL2Available() ) {
	// alert("Your device supports WebGL 2!")
} else {
    // Buy a new PC, please
	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}
