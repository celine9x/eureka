
# Content
Style:  flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: --spacing-lg, display: 'inline-flex'

Variant: List

----

## Heading: 
style: justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex
---- 



### Left
- Title: --text-heading-h2, --color-content-primary
- Badge count


### Right 
Button: primary icon plus label "Add", size medium

## Toolbar
style: justifyContent: flex-start, alignItems: flex-end, gap: --spacing-md, display: inline-flex, flexWrap: wrap, align content: flex-end

## Left
Style: 

### Switch view
style: padding-right: --spacing-sm, border:outline 1px --color-outline-neutral
Button group:   <ButtonGroupItem value="list" iconName="QueueList"></ButtonGroupItem>
  <ButtonGroupItem value="kanban" iconName="ViewColumns"></ButtonGroupItem>


### Search

textinput: size md, label search, placehodler search with keyword

### Filters
Style: justifyContent: 'flex-start', alignItems: 'center', gap: --spacing-md, display: 'inline-flex'

textinput empty : size md, place holder : select status, label: Companies, trailing icon: chevron down
textinput filled: label: Status, text filled: All, trailing icon: chevron down
button: size:md, secondary, leading-icon: settings, label: More filters



## Right
Style: justifycontent: flex-end, alignitems: center, gap: --spacing-md, display: inline-flex 
Button: secondary, size-md, icon upload label export
Button: secondary, size-md, icon settings

## Table
componetn table 


Variant: Content

2 columns layout 

Accorions : size-lg 
content inside accoridon: 2 columns use list of  library/atoms/content-field.jsx