Partials

Partials are SCSS file of their own, but they don’t get converted to CSS file. 
Common use case, is you want to declare all your variable in a file. 
Naming convention, need underscore. So SCSS knows its a partial. 

Mixins
Create reusable piece of code 
@mixin warning {
  background-color: orange;
  color: white;
}

@mixin large-text {
  font: {
    size: 22px;
    weight: bold;
  }
}

@mixin rounded {
  border-radius: 6px;
}

@mixin box {
  @include rounded;
  border: 1px; 
}

How to use: 
h2 {
  @include large-text;
}
@mixin fancy-links {
  a {
    font-style: italic;
    text-decoration: none;
  }
}

//Can also include it on the root level
@include fancy-links


//Pass the name 
@include box($border: 1px solid #999);

//Default values
@mixin box($radius: 6px, $border: 1px solid #000) {
  @include rounded($radius);
  border: $border;
}
