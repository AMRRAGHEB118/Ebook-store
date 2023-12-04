let metaContent = (titlePage) => {

    return `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${titlePage}</title>
    `
}


let headLinks = `
<link rel="preconnect" href="https://fonts.gstatic.com" />
<script src="https://kit.fontawesome.com/43fb81e0ee.js" crossorigin="anonymous"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
<link rel="stylesheet" href="../css/globalCss.css">
`

let linkStyleRender = (linkStyle) => {
  let newStyleLink = `<link rel="stylesheet" href="${linkStyle}" />`;
  headLinks += newStyleLink;
}