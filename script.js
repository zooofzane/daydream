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
    let svg = `text.svg`;

    paper.project.importSVG(svg, function(item) {
        daydream = item
        daydream.position = new Point(daydream.bounds.width / 2, daydream.bounds.height / 2)
    })

    function onResize(event) {
        initializePath();
    }
}