import * as THREE from 'three';

// Ashima 3D simplex noise (MIT)
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const CORE_VERT = /* glsl */ `
uniform float uTime, uPixelRatio, uSize, uBreath;
attribute vec3 aSphere;
attribute vec4 aRand;
varying vec3 vColor;
varying float vAlpha;
${NOISE}
void main(){
  float t = uTime;
  // --- sphere state
  float n = snoise(aSphere * 1.4 + vec3(0.0, t * 0.22, t * 0.11));
  float n2 = snoise(aSphere * 4.0 + vec3(t * 0.9));
  float r = 1.0 + n * 0.16 + uBreath * 0.04;
  vec3 sphere = aSphere * r;
  vec3 p = sphere;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = uSize * (0.35 + aRand.z * 0.9);
  gl_PointSize = size * uPixelRatio * (4.0 / max(0.2, -mv.z));
  // Brand blue and white highlights.
  vec3 brand = vec3(0.192, 0.333, 1.0);
  vec3 highlight = vec3(1.0);
  float k = smoothstep(-0.6, 0.8, n + aSphere.y * 0.4);
  vec3 col = mix(brand, highlight, k * 0.55);
  col = mix(col, highlight, smoothstep(0.55, 1.0, n2) * 0.5);
  vColor = col;
  float depthFade = smoothstep(-9.0, -1.0, mv.z);
  vAlpha = (0.45 + aRand.w * 0.55) * mix(1.0, depthFade, 0.6);
}`;

const CORE_FRAG = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.0, d);
  a = pow(a, 1.6);
  gl_FragColor = vec4(vColor * a * 1.35, a * vAlpha * uOpacity);
}`;

const GLOW_FRAG = /* glsl */ `
uniform float uOpacity;
varying vec2 vUv;
void main(){
  float d = length(vUv - 0.5) * 2.0;
  float g = exp(-d * d * 4.5) * 0.32;
  vec3 col = vec3(0.192, 0.333, 1.0);
  gl_FragColor = vec4(col * g, g * uOpacity);
}`;

const DUST_VERT = /* glsl */ `
uniform float uTime, uPixelRatio, uScroll;
attribute vec4 aRand;
varying float vAlpha;
void main(){
  vec3 p = position;
  p.y += mod(uScroll * (0.3 + aRand.x * 0.6) + uTime * 0.02 * aRand.y + 20.0, 40.0) - 20.0;
  p.x += sin(uTime * 0.1 + aRand.z * 6.28) * 0.3;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.0 + aRand.w * 2.2) * uPixelRatio * (8.0 / max(0.5, -mv.z));
  vAlpha = (0.15 + aRand.x * 0.5) * smoothstep(-40.0, -4.0, mv.z);
}`;

const DUST_FRAG = /* glsl */ `
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vec3(1.0) * a, a * vAlpha);
}`;

export type Layout = { x: number; y: number; scale: number; opacity: number };

export class VoiceCore {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly group = new THREE.Group();
  readonly uniforms = {
    uTime: { value: 0 },
    uBreath: { value: 0 },
    uPixelRatio: { value: 1 },
    uSize: { value: 5 },
    uOpacity: { value: 1 }
  };
  private readonly glowUniforms = {
    uOpacity: { value: 1 }
  };
  private readonly dustUniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: 1 },
    uScroll: { value: 0 }
  };
  /** Target layout (lerped every frame). */
  layout: Layout = { x: 0, y: 0, scale: 1, opacity: 1 };
  private current: Layout = { x: 0, y: 0, scale: 1, opacity: 0 };
  private pointer = new THREE.Vector2();
  private pointerSmooth = new THREE.Vector2();
  private readonly timer = new THREE.Timer();
  private readonly glow: THREE.Mesh;
  scroll = 0;

  constructor(canvas: HTMLCanvasElement, opts: { lowPower: boolean }) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setClearColor(0x0a0a0a, 1);
    const pr = Math.min(window.devicePixelRatio, opts.lowPower ? 1.5 : 2);
    this.renderer.setPixelRatio(pr);
    this.uniforms.uPixelRatio.value = pr;
    this.dustUniforms.uPixelRatio.value = pr;

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    this.camera.position.set(0, 0, 6);
    this.scene.add(this.group);

    // --- core particles
    const N = opts.lowPower ? 9000 : 22000;
    const sphere = new Float32Array(N * 3);
    const rand = new Float32Array(N * 4);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      const jitter = 1 + (Math.random() - 0.5) * 0.04;
      sphere.set([Math.cos(th) * rad * jitter, y * jitter, Math.sin(th) * rad * jitter], i * 3);
      rand.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(sphere, 3));
    geo.setAttribute('aSphere', new THREE.BufferAttribute(sphere, 3));
    geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 4));
    const mat = new THREE.ShaderMaterial({
      vertexShader: CORE_VERT,
      fragmentShader: CORE_FRAG,
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    this.group.add(points);

    // --- soft glow behind the core
    this.glow = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 7),
      new THREE.ShaderMaterial({
        vertexShader:
          'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
        fragmentShader: GLOW_FRAG,
        uniforms: this.glowUniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    this.glow.position.z = -0.5;
    this.group.add(this.glow);

    // --- ambient dust
    const D = opts.lowPower ? 700 : 1600;
    const dpos = new Float32Array(D * 3);
    const drand = new Float32Array(D * 4);
    for (let i = 0; i < D; i++) {
      dpos.set([(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 40, -Math.random() * 30 + 2], i * 3);
      drand.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
    }
    const dgeo = new THREE.BufferGeometry();
    dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
    dgeo.setAttribute('aRand', new THREE.BufferAttribute(drand, 4));
    const dust = new THREE.Points(
      dgeo,
      new THREE.ShaderMaterial({
        vertexShader: DUST_VERT,
        fragmentShader: DUST_FRAG,
        uniforms: this.dustUniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    dust.frustumCulled = false;
    this.scene.add(dust);

    window.addEventListener('pointermove', (e) => {
      this.pointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    });
    window.addEventListener('resize', () => this.resize());
    this.resize();
    this.renderer.setAnimationLoop(() => this.tick());
  }

  /** Snap the current (lerped) layout to the target. */
  snap() {
    Object.assign(this.current, this.layout);
  }

  get currentLayout(): Layout {
    return this.current;
  }

  private resize() {
    const w = innerWidth;
    const h = innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    // keep the size of the core consistent on narrow screens
    this.uniforms.uSize.value = (w < 700 ? 5.5 : 6.5) * (this.renderer.getPixelRatio() < 1.5 ? 1.25 : 1);
  }

  private tick() {
    this.timer.update();
    const dt = Math.min(this.timer.getDelta(), 0.05);
    const t = this.timer.getElapsed();
    const u = this.uniforms;
    u.uTime.value = t;
    u.uBreath.value = Math.sin(t * 1.3) * 0.5 + 0.5;
    this.dustUniforms.uTime.value = t;
    this.dustUniforms.uScroll.value += (this.scroll * 0.004 - this.dustUniforms.uScroll.value) * 0.08;
    // layout lerp
    const f = 1 - Math.pow(0.001, dt);
    const c = this.current;
    const L = this.layout;
    c.x += (L.x - c.x) * f;
    c.y += (L.y - c.y) * f;
    c.scale += (L.scale - c.scale) * f;
    c.opacity += (L.opacity - c.opacity) * f;
    this.group.position.set(c.x, c.y, 0);
    this.group.scale.setScalar(c.scale);
    u.uOpacity.value = c.opacity;
    this.glowUniforms.uOpacity.value = c.opacity;

    this.pointerSmooth.lerp(this.pointer, 0.05);
    this.group.rotation.y = t * 0.06 + this.pointerSmooth.x * 0.35;
    this.group.rotation.x = -this.pointerSmooth.y * 0.25;
    // billboard: cancel the group's rotation so the glow always faces the camera
    this.glow.quaternion.copy(this.group.quaternion).invert();

    this.renderer.render(this.scene, this.camera);
  }
}
