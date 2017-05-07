// title      : kcup
// author     : John Cole
// license    : ISC License
// file       : kcup.jscad

/* exported main, getParameterDefinitions */

function getParameterDefinitions() {
  return [
    {
        name: 'pods',
        type: 'int',
        initial: 3,
        caption: 'Height:'
    },
    {
      name: 'resolution',
      type: 'choice',
      values: [0, 1, 2],
      captions: [
        'low (8,16)',
        'normal (12,32)',
        'high (24,128)',
      ],
      initial: 0,
      caption: 'Resolution:'
    }
  ];
}

function main(params) {
  var resolutions = [
    [8, 16],
    [12, 32],
    [16, 256],
  ];
  CSG.defaultResolution3D = resolutions[params.resolution][0];
  CSG.defaultResolution2D = resolutions[params.resolution][1];
  util.init(CSG);

  var cup = util.group();
  cup.add(Parts.Cone(37.1, 44, 40), 'base');
  cup.add(
    Parts.Cylinder(46.14, 3.5).snap(cup.parts.base, 'z', 'outside-'),
    'rim'
  );
  cup.add(Parts.Cylinder(51.35, 1).snap(cup.parts.rim, 'z', 'outside-'), 'lip');

  var rimgap = cup.combine('lip').enlarge(1, 1, 1);
  var basesize = 58;

  var base = util.group();
  base.add(
    Parts.RoundedCube(basesize, basesize, 10, 5)
      .align(cup.parts.lip, 'xy')
      .snap(cup.parts.lip, 'z', 'outside-')
      .translate([0, 0, -5])
      .fillet(2, 'z-')
      .fillet(2, 'z+'),
    'base'
  );

  var slotcoutout = rimgap
    .stretch('x', basesize)
    .intersect(base.parts.base)
    .color('orange');
  var bottomcoutout = cup.parts.rim
    .enlarge(1, 1, 1)
    .stretch('x', basesize)
    .intersect(base.parts.base)
    .color('purple');

  var thickness = 1.6;
  var width = rimgap.size().x;
  var height = params.pods;
  // var tube = util.group();

  base.add(
    Parts.Cone(width + thickness, width + thickness + 2, 45 * height)
      .snap(base.parts.base, 'z', 'outside-')
      .fillet(-1, 'z-')
      .color('green'),
    'tube'
  );

  base.add(
    Parts.Cylinder(width + 4, 2)
      .chamfer(1, 'z-')
      .fillet(1, 'z+')
      .snap(base.parts.tube, 'z', 'inside+'),
    'rim'
  );

  base.add(
    Parts.Cube([5, 10, 45 * height])
      .align(base.parts.base, 'y')
      .snap(base.parts.base, 'z', 'outside-')
      .snap(base.parts.base, 'x', 'inside-'),
    'spine'
  );

  base.add(
    Parts.Cube([2, 10, 5])
      .align(base.parts.spine, 'y')
      .snap(base.parts.spine, 'z', 'outside+')
      .snap(base.parts.spine, 'x', 'inside-')
      .color('yellow'),
    'spine-base'
  );

  var tubewindow = Parts.RoundedCube(45 * (height - 1), 10, 10, 10)
    .rotateY(90)
    .align(base.parts.tube, 'yz')
    .snap(base.parts.tube, 'x', 'outside-')
    .translate([-5, 0, 0])
    .color('red');

  base.add(
    tubewindow.intersect(base.parts.tube).enlarge(2, 2, 2).color('pink'),
    'tubewindowlip'
  );

  var interior = Parts.Cone(width, width + 2, 45 * height)
    .align(base.parts.tube, 'xyz')
    .color('red');

  var sgap = -0.7;
  var parts = {
    dispenser: function() {
      return base
        .combine()
        .subtract([
          interior,
          slotcoutout,
          bottomcoutout,
          rimgap.stretch('z', 10).color('cyan'),
          tubewindow
        ]);
    },
    support: function() {
      return bottomcoutout.enlarge(sgap, sgap, 0).bisect('x').parts.negative;
    },
    combined: function() {
      return union([parts.dispenser(), parts.support()]);
    }
    
  };
  return parts['combined']().Zero();
}

// ********************************************************
// Other jscad libraries are injected here.  Do not remove.
// Install jscad libraries using NPM
// ********************************************************
// include:js
// endinject
