paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.
var tool1, tool2;

window.onload = function() {
    paper.setup('myCanvas');

    // Create two drawing tools.
    // tool1 will draw straight lines,
    // tool2 will draw clouds.

    // Both share the mouseDown event:
    var path;
    let daydream;

    function onMouseDown(event) {
        path = new Path();
        path.strokeColor = 'black';
        path.add(event.point);
    }

    tool1 = new Tool();
    tool1.onMouseDown = onMouseDown;

    tool1.onMouseDrag = function(event) {
        path.add(event.point);
    }

    tool2 = new Tool();
    tool2.minDistance = 20;
    tool2.onMouseDown = onMouseDown;

    tool2.onMouseDrag = function(event) {
        // Use the arcTo command to draw cloudy lines
        path.arcTo(event.point);
    }


    function onResize(event) {
        initializePath();
    }
}





var width, height, center;
var points = 10;
var smooth = true;
var path = new Path();
var mousePos = view.center / 2;
var pathHeight = mousePos.y;
path.fillColor = 'black';
initializePath();

function initializePath() {
    center = view.center;
    width = view.size.width;
    height = view.size.height / 2;
    path.segments = [];
    path.add(view.bounds.bottomLeft);
    for (var i = 1; i < points; i++) {
        var point = new Point(width / points * i, center.y);
        path.add(point);
    }
    path.add(view.bounds.bottomRight);
    path.fullySelected = true;
}

function onFrame(event) {
    pathHeight += (center.y - mousePos.y - pathHeight) / 10;
    for (var i = 1; i < points; i++) {
        var sinSeed = event.count + (i + i % 10) * 100;
        var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
        var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
        path.segments[i].point.y = yPos;
    }
    if (smooth)
        path.smooth({ type: 'continuous' });
}

function onMouseMove(event) {
    mousePos = event.point;
}

function onMouseDown(event) {
    smooth = !smooth;
    if (!smooth) {
        // If smooth has been turned off, we need to reset
        // the handles of the path:
        for (var i = 0, l = path.segments.length; i < l; i++) {
            var segment = path.segments[i];
            segment.handleIn = segment.handleOut = null;
        }
    }
}

// Reposition the path whenever the window is resized:
function onResize(event) {
    initializePath();
}