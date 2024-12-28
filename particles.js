//import { tsParticles } from https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.0.3/+esm;
//import { loadAll } from https://cdn.jsdelivr.net/npm/@tsparticles/all@3.0.3/+esm;
var userOS;    // will either be iOS, Android or unknown
var userOSver; // this is a string, use Number(userOSver) to convert
window.onload = async () => {
  getOS();

}
$(document).ready(async function () {
  await loadHeartShape(tsParticles);
  await loadFull(tsParticles);
});

async function loadParticles(options) {
  //await loadFull(tsParticles);
  await tsParticles.load({ id: "tsparticles", options });

  }
  
  const options = {
    "autoPlay": true,
    fullScreen: 
    {
        enable: true,
        zIndex: -1
    },
    particles: {

      color: {
          value: ["#ff0b9a", "#7FB1ED"]
      },
      move: {
        angle: {
          offset: 0,
          value: 5
        },
        direction: "random",
        enable: true,
        outModes: {
          default: "out"
        },
        speed: 0.4
      },
      number: {
        value: 200
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.3
        }
      },
      shape: {
        type: "heart"
      },
      size: {
        value: {
          min:10,
          max:20
        }
      }    
    }
  };

const optionsConfetti = {
  autoPlay: true,
  fullScreen: {
    enable: true
  },
  particles: {
    number: {
      value: 0
    },
    color: {
      value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"]
    },
    shape: {
      type: ["circle", "square"]
    },
    opacity: {
      value: {
        max: 1,
        min: 0
      },
      animation: {
        enable: true,
        speed: 2,
        startValue: "max",
        destroy: "min"
      }
    },
    size: {
      value: { min: 3, max: 7 }
    },
    life: {
      duration: 1,
      count: 1
    },
    move: {
      enable: true,
      gravity: {
        enable: true,
        acceleration: 20
      },
      speed: {
        min: 25,
        max: 50
      },
      drift: {
        min: -2,
        max: 2
      },
      decay: 0.05,
      direction: "none",
      outModes: {
        default: "destroy",
        top: "none"
      }
    },
    rotate: {
      value: {
        min: 0,
        max: 360
      },
      direction: "random",
      move: true,
      animation: {
        enable: true,
        speed: 60
      }
    },
    tilt: {
      direction: "random",
      enable: true,
      move: true,
      value: {
        min: 0,
        max: 360
      },
      animation: {
        enable: true,
        speed: 60
      }
    },
    roll: {
      darken: {
        enable: true,
        value: 25
      },
      enable: true,
      speed: {
        min: 15,
        max: 25
      }
    },
    wobble: {
      distance: 30,
      enable: true,
      move: true,
      speed: {
        min: -15,
        max: 15
      }
    }
  },
  interactivity: {
    detectsOn: "window",
    events: {
      resize: true
    }
  },
  detectRetina:false,
  emitters: [
    {
      direction: "top-right",
      life: {
        duration: 10,
        count: 1
      },
      rate: {
        delay: 0.1,
        quantity: 5
      },
      position: {
        x: 0,
        y: 0
      },
      size: {
        width: 0,
        height: 0
      }
    },
    {
      life: {
        duration: 10,
        count: 1
      },
      direction: "top",
      rate: {
        delay: 0.1,
        quantity: 5
      },
      position: {
        x: 50,
        y: 0
      },
      size: {
        width: 0,
        height: 0
      }
    },
    {
      life: {
        duration: 10,
        count: 1
      },
      direction: "top-left",
      rate: {
        delay: 0.1,
        quantity: 5
      },
      position: {
        x: 100,
        y: 0
      },
      size: {
        width: 0,
        height: 0
      }
    }
  ]
}
loadParticles(options);

function startParticles() {
    loadParticles(options);
    tsParticles.domItem(0).play();
}
function stopParticles() {
   tsParticles.domItem(0).stop();
}
function startConfetti() {
  //alert(userOS+"startc");
  if ((userOS === 'iOS' && Number( userOSver.charAt(0) ) >= 14 ) || userOS === 'Android'|| typeof userOS === 'undefined') {
    loadParticles(optionsConfetti);
    tsParticles.domItem(0).play();
  } else {
    confetti_fallback();
  }
}
function stopConfetti() {
  //alert(userOS+"stopC");
  if ((userOS === 'iOS' && Number( userOSver.charAt(0) ) >= 14 ) || userOS === 'Android'|| typeof userOS === 'undefined') {
    tsParticles.domItem(0).stop();
  }
}
export {startParticles, stopParticles, startConfetti, stopConfetti};
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function confetti_fallback() {
  var duration = 10 * 1000;
   var end = Date.now() + duration;
   var defaults = { startVelocity: 10, spread: 360, ticks: 70, zIndex: 0 };
   var particleCount = 5 ;
   (function frame() {
   // launch a few confetti from the left edge
   confetti({...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#FFFFFF']}
   );
   // and launch a few from the right edge
   confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },colors: ['#FFFFFF']}
   );

   // keep going until we are out of time
   if (Date.now() < end) {
       requestAnimationFrame(frame);
       
       return;
   }
  }());
}

function getOS()
{
  var ua = navigator.userAgent;
  var uaindex;

  // determine OS
  if ( ua.match(/iPad/) || ua.match(/iPod/) || ua.match(/iPhone/) )
  {
    userOS = 'iOS';
    uaindex = ua.indexOf( 'OS ' );
  }
  else if ( ua.match(/Android/) )
  {
    userOS = 'Android';
    uaindex = ua.indexOf( 'Android ' );
  }
  else
  {
    userOS = 'unknown';
  }

  // determine version
  if ( userOS === 'iOS'  &&  uaindex > -1 )
  {
    userOSver = ua.substring(uaindex + 3, uaindex+3+2);
  }
  else if ( userOS === 'Android'  &&  uaindex > -1 )
  {
    userOSver = ua.substring( uaindex + 8, uaindex + 8 + 3 );
  }
  else
  {
    userOSver = 'unknown';
  }
}