##Flexbox Terminology

* Flex-container: The parent container, which holds child flex-items
* Flex-items: Child containers held within a parent flex-container 
* Main Axis: The flow-direction, or primary axis along which child flex items flow, set on the parent container. Run either horizontally or vertically 
* Cross Axis: The axis that flows opposite or perpendicular to the main axis. The direction of the cross axis is determined by the main axis

##Flow Axis Directions

- Flow direction can run either along a main axis or along a cross axis
- Think of main axis and cross axis, as rows and columns
- The main axis and cross axis directions can both run either horizontally or vertically (But not at the same time)
  - If the parent flex container is using a flow direction of row (default), then the main axis is going to run horizontally across your layout. That means, the cross axis would be vertical. 
  - If the parent flex container is using a flow direction of column, then the main axis is going to run vertically across your layout. That means, the cross axis would be horizontal. 
- Flexbox uses properties to control child flex-item alignments, which are based off of the main and cross axis. 

##Flex width
Even if child has a with 100px set on them: 

```
        #parent {
            display: flex;
            background: steelblue;
            height: 100px;
            flex-direction: row;
        }

        .child {
            width: 100px;
        }

        .child1 {
            background: skyblue;
        }

        .child2 {
            background: powderblue;
        }

```

They will flex to accommodate the flex container. The width of the child flex item begins to collapse even though they have a width of 100px. 
By default the child flex items shrink to fits the parent container width.  

Using the min-width on the child:

```
  .child {
            min-width: 100px;
        }
```

The `min-with` takes priority over the parent container. This is an overflow.

Summary: 

If the width of the parent container is greater than the width of the child element, then the child element width are maintain.
If the width of the parent container is less than the width of the child element. Then the child element with are scaled 
Using `min-width` overflows them

##Flex Wrap
Go into a new line, instead of scale or overflow
`flex-wrap: wrap;` Depending of available space. If they can all fit on one line, they will, If the isn't enough room, they will break into a new row. 

Default is `no-wrap`
Summary: IThe fle wrap using a value of wrap, he will maintain the child element width, forcing the child elements into additional line if needed

##Main axis and alignment

`space-between`: The very first child element is pushed to the parent element starting point. On the right hand side, the last child element is pushed to the parent container ending point.
The remaining children between the first and last are then equally spaced apart. 
`space-around`: similar to `space-between` but the first child and last child elements, have a little bit of space before them on the left hand side and after them on the right hand side. The amount of space between each of the child elements 
gets divided into and dropped before the first child element and after the last child element. 

##Align Self
Allow a child to override default alignment/alignment on the parent container

##Align Content
Only work if we have wrapping child elements
The value that we can use for align-content is the same of align-items. Default is `stretch`