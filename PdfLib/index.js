

const {PDFDocument, StandardFonts, rgb, degrees} = require('pdf-lib')

const fs = require('fs')

const axios = require("axios")

// const fetch = require('fetch')
// async function createPdf(){

//     const doc = await PDFDocument.create()
    
//     doc.addPage()

//     fs.writeFileSync("output.pdf", await doc.save() )

// }

// createPdf()

async function modifyPdf() {
    const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    // const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  
    const existingPdfBytes = await axios.get(url, { responseType: 'arraybuffer' })


    const pdfDoc = await PDFDocument.load(existingPdfBytes.data)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()

    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()

    firstPage.drawText('This text was added with JavaScript!', {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    })
    console.log("testing")
    const pdfBytes = await pdfDoc.save();
    // const pdfBytes = await pdfDoc.save()
    fs.writeFileSync("output.pdf", pdfBytes)
}
modifyPdf()