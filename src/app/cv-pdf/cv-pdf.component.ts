import { Component, OnInit } from '@angular/core';
import { DatajsonService } from '../shared/datajson.service';

import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from "pdfmake/build/pdfmake";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-cv-pdf',
  templateUrl: './cv-pdf.component.html',
  styleUrls: ['./cv-pdf.component.css']
})
export class CvPdfComponent implements OnInit {
  data_cursos: any;
  data_proyect: any;
  data_edu: any;
  data_exp: any;
  data_skills: any;
  data_social: any;
  data_idiomas: any;
  pdf_do: boolean = false;

  img: string = "../../../assets/julio.png";


  imagen_user_base64: any = this.getBase64ImageFromURL(this.img);
  personas: any;
  cv_web: any = 'https://cv-lazarte-julio.web.app/';

  url_git: string = 'https://img.icons8.com/windows/512/github.png';
  url_linkedin: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/300px-Linkedin.svg.png';
  nombre_person: any;
  data_persona: any;
  apellido_person: any;
  corse_name: any;
  couse_percent: any;
  nombres_cursos: any;



  constructor(private datajsonservice: DatajsonService) { }
  ngOnInit(): void {
    this.getData()
  }


  getData(): void {
    this.datajsonservice.getData().subscribe((data) => {
      this.data_cursos = data.cursos;
      this.data_proyect = data.proyectos;
      this.data_edu = data.educacion;
      this.data_exp = data.experiencia;
      this.data_skills = data.hard_andsskills;
      this.data_social = data.skill_social;
      this.data_idiomas = data.idiomas;
      this.data_persona = data.persona;

      console.log("JSON: ",this.data_cursos)

      this.data_persona.map((item: {
        nombre: any;
        apellido: any;
      }) =>(
        this.apellido_person = item.apellido,
        this.nombre_person = item.nombre),
        )
        console.log('apellido:',this.nombre_person, this.apellido_person)

        this.data_cursos.map((item: {cursos: any}) =>( this.nombres_cursos = item.cursos,
          console.log('Cursos:',this.nombres_cursos)
          ))
      });
    // });

  }
  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  async downloadPdf(pdf_do: boolean) {
    const docDefinition = {
    content: [
      'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
      {
        columns: [
          {
            width: '30%',
            image: await this.getBase64ImageFromURL(this.img),
            crossOrigin: 'anonymous',
            fit: [110, 110],
            alignment: 'center',
            margin: [0, 0, 0, 0]
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: 'Second column'
          },
          {
            // fixed width
            width: 100,
            text: this.nombres_cursos
          },
          {
            // % width
            width: '20%',
          text:`${this.apellido_person} ${this.nombre_person}`
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      'This paragraph goes below all columns and has full width'
    ]
  };
  // const pdf = pdfMake.createPdf(docDefinition);
  // pdf.open();
  }


  async downloadPdff(pdf_do: boolean) {
    // if (this.valor_redes) {

    const docDefinition = {
      // info: {
      //   title: `Curriculum Vitae`,
      //   // title: `Curriculum Vitae ${this.personas.nombre} ${this.personas.apellido}`,
      //   author: `Julio`,
      //   // author: `${this.personas.nombre} ${this.personas.apellido}`,
      // },
      // pageMargins: [20, 20, 20, 20],
      content: [
        {
          columns: [
            {
              width: '30%',
              image: await this.getBase64ImageFromURL(this.img),
              crossOrigin: 'anonymous',
              fit: [110, 110],
              alignment: 'center',
              margin: [0, 0, 0, 0]
            },
            {
              // alignment: "center",
              text: [
                {
                  fontSize: 18, bold: true,
                  text: `${this.personas.nombre} ${this.personas.apellido}     `
                },
                {
                  fontSize: 13,
                  text: `(${this.personas.city} -  ${this.personas.edad})\n`,
                },
                {
                  text: `${this.personas.title}\n`,
                  fontSize: 16,
                  bold: true,
                  // color: '#3e6283'
                },
                {
                  text: [
                    {
                      alignment: "justify",
                      color: 'gray',
                      italics: true,
                      text: `${this.personas.about}\n`,
                      style: 'contact'
                    },
                    {
                      text: 'Ver Curriculum Web',
                      // link: this.cv_web,
                      // link: `https://julio-lazarte-cv.web.app`,
                      style: {
                        decoration: 'underline',
                        color: '#2780E3',
                      }
                    },
                    { text: '     -     ' },
                    {
                      text: this.personas.email,
                      link: `mailto:${this.personas.email}?subject=Contacto%20desde%20PDF-Curriculum%20Web`,
                      style: {
                        decoration: 'underline',
                        color: '#2780E3',
                      },
                    },
                  ],
                },
              ],
            },

          ],
        },
        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 8 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382aa' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },
        {
          text: 'Formación',
          style: 'sectionHeader',
        },

        //Agrega la sección de educación
        {
          ul: this.data_edu.map((edu: any) => {
            return {
              text: [
                { text: `${edu.titleE}`,
                bold: true,
                color: '#1B23A3' }, // Agregamos la propiedad 'bold' al objeto de estilo
                ` - ${edu.schoolE} (${edu.startE} - ${edu.endE}) ${edu.estadoE}.`
              ]
            };
          }),
          margin: [15, 0, 0, 0],
        },

        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 1 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382af ' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },

        //Agrega la sección de Idiomas
        {
          columns: [
            {
              width: '20%',
              text: 'Idiomas',
              style: 'sectionHeader',
            },
            {
              width: '40%',
              alignment: 'left',
              stack: this.data_idiomas.slice(0, Math.ceil(this.data_idiomas.length / 2)).map((idioma: any) => {
                const porcentaje = idioma.porcentaje;
                const porcentajeNum = parseFloat(porcentaje.slice(0, -1));
                const barra = {
                  canvas: [
                    {
                      type: 'rect',
                      x: 0,
                      y: 0,
                      w: 100,
                      h: 10,
                      color: '#c6c6c6',
                      border: [0.5, 0.5, 0.5, 0.5]
                    },
                    {
                      type: 'rect',
                      x: 0.5,
                      y: 0.5,
                      w: porcentajeNum,
                      h: 9,
                      color: porcentajeNum >= 80 ? '#002f7a' : porcentajeNum >= 50 ? '#0044b3' : '#5797ff'
                    }
                  ]
                };
                const texto = `${idioma.nombre} - ${idioma.porcentaje}`;
                return [
                  barra,
                  { text: texto, margin: [0, 5, 0, 0] }
                ];
              }),
              margin: [15, 5, 0, 0]
            },
            {
              width: '40%',
              alignment: 'left',
              stack: this.data_idiomas.slice(Math.ceil(this.data_idiomas.length / 2)).map((idioma: any) => {
                const porcentaje = idioma.porcentaje;
                const porcentajeNum = parseFloat(porcentaje.slice(0, -1));
                const barra = {
                  canvas: [
                    {
                      type: 'rect',
                      x: 0,
                      y: 0,
                      w: 100,
                      h: 10,
                      color: '#c6c6c6',
                      border: [0.5, 0.5, 0.5, 0.5]
                    },
                    {
                      type: 'rect',
                      x: 0.5,
                      y: 0.5,
                      w: porcentajeNum,
                      h: 9,
                      color: porcentajeNum >= 80 ? '#002f7a' : porcentajeNum >= 50 ? '#0044b3' : '#5797ff'
                    }
                  ]
                };
                const texto = `${idioma.nombre} - ${idioma.porcentaje}`;
                return [
                  barra,
                  { text: texto, margin: [0, 5, 0, 0] }
                ];
              }),
              margin: [0, 5, 15, 0]
            }
          ]
        },

        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 1 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382af ' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },

        // Agrega la sección de Experiencia
        {
          text: 'Experiencia',
          style: 'sectionHeader',
        },
        {
          ul: this.data_exp.map((exp: any) => {
            return {
              text: [
                { text: `${exp.cargoE}`, bold: true, color: '#1B23A3' }, // Agregamos la propiedad 'bold' al objeto de estilo
                ` - ${exp.nombreE} (${exp.startE} - ${exp.endE}) ${exp.descripcionE} - ${exp.cityE}.`
              ]
            };
          }),
          margin: [15, 0, 0, 0],
        },

        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 1 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382af ' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },

        /////////////////////////////////////////////////////////////////////
        //Agrega la sección de hardsskills
        {
          columns: [
            [
              { text: 'Hard', style: 'sectionHeader', alignment: 'center', margin: [0, 5, 0, 0] },
              [{ text: ' & ', style: 'sectionHeader', margin: [0, 0, 0, 0], alignment: 'center' }],
              [{ text: 'Soft skills', style: 'sectionHeader', alignment: 'center', margin: [0, 0, 0, 0] },
              ]
            ],
            {
              width: '25%',
              alignment: 'center',
              stack: this.data_skills.slice(0, Math.ceil(this.data_skills.length / 3)).map((hardsskills: any) => {
                const porcentaje = hardsskills.porcentaje;
                const porcentajeNum = parseFloat(porcentaje.slice(0, -1));
                const barra = {
                  canvas: [
                    {
                      type: 'rect',
                      x: 0,
                      y: 0,
                      w: 100,
                      h: 10,
                      color: '#c6c6c6',
                      border: [0.5, 0.5, 0.5, 0.5]
                    },
                    {
                      type: 'rect',
                      x: 0.5,
                      y: 0.5,
                      w: porcentajeNum,
                      h: 9,
                      // color: porcentajeNum >= 80 ? '#002f7a' : porcentajeNum >= 50 ? '#0044b3' : '#5797ff'
                      color: porcentajeNum >= 90 ? '#070E76' : porcentajeNum >= 80 ? '#1B23A3' : porcentajeNum >= 70 ? '#434CDA' : porcentajeNum >= 60 ? '#747CFC' : porcentajeNum >= 50 ? '#999FFD' : porcentajeNum >= 40 ? '#BBBFFA' : '#D8DAF8'

                    }
                  ]
                };
                const texto = `${hardsskills.nombre} - ${hardsskills.porcentaje}`;
                return [
                  barra,
                  { text: texto, alignment: 'center', margin: [0, 5, 0, 0], fontSize: '10' }];
              }),
              margin: [15, 5, 0, 0]
            },
            {
              width: '25%',
              alignment: 'center',
              stack: this.data_skills.slice(Math.ceil(this.data_skills.length / 3), (Math.ceil(this.data_skills.length / 3) * 2)).map((hardsskills: any) => {
                const porcentaje = hardsskills.porcentaje;
                const porcentajeNum = parseFloat(porcentaje.slice(0, -1));
                const barra = {
                  canvas: [
                    {
                      type: 'rect',
                      x: 0,
                      y: 0,
                      w: 100,
                      h: 10,
                      color: '#c6c6c6',
                      border: [0.5, 0.5, 0.5, 0.5]
                    },
                    {
                      type: 'rect',
                      x: 0.5,
                      y: 0.5,
                      w: porcentajeNum,
                      h: 9,
                      color: porcentajeNum >= 90 ? '#070E76' : porcentajeNum >= 80 ? '#1B23A3' : porcentajeNum >= 70 ? '#434CDA' : porcentajeNum >= 60 ? '#747CFC' : porcentajeNum >= 50 ? '#999FFD' : porcentajeNum >= 40 ? '#BBBFFA' : '#D8DAF8'

                    }
                  ]
                };
                const texto = `${hardsskills.nombre} - ${hardsskills.porcentaje}`;
                return [
                  barra,
                  { text: texto, alignment: 'center', margin: [0, 5, 0, 0], fontSize: '10' }
                ];
              }),
              margin: [15, 5, 0, 0]
            },
            {
              width: '25%',
              alignment: 'center',
              stack: this.data_skills.slice((Math.ceil(this.data_skills.length / 3) * 2)).map((hardsskills: any) => {
                const porcentaje = hardsskills.porcentaje;
                const porcentajeNum = parseFloat(porcentaje.slice(0, -1));
                const barra = {
                  canvas: [
                    {
                      type: 'rect',
                      x: 0,
                      y: 0,
                      w: 100,
                      h: 10,
                      color: '#c6c6c6',
                      border: [0.5, 0.5, 0.5, 0.5]
                    },
                    {
                      type: 'rect',
                      x: 0.5,
                      y: 0.5,
                      w: porcentajeNum,
                      h: 9,
                      color: porcentajeNum >= 90 ? '#070E76' : porcentajeNum >= 80 ? '#1B23A3' : porcentajeNum >= 70 ? '#434CDA' : porcentajeNum >= 60 ? '#747CFC' : porcentajeNum >= 50 ? '#999FFD' : porcentajeNum >= 40 ? '#BBBFFA' : '#D8DAF8'
                    }
                  ]
                };
                const texto = `${hardsskills.nombre} - ${hardsskills.porcentaje}`;
                return [
                  barra,
                  { text: texto, alignment: 'center', margin: [0, 5, 0, 0], fontSize: '10' }
                ];
              }),
              margin: [0, 5, 15, 0]
            }
          ]
        },
        //////////////////////////////////////////////////////////////////////////////////////////////

        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 1 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382af ' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },

        // Agrega la sección de Proyectos
        {
          text: 'Proyectos',
          style: 'sectionHeader',
        },
        {
          ul: this.data_proyect.map((exp: any) => {
            return {
              text: [
                { text: `${exp.proyectos}`, bold: true, color: '#1B23A3' }, // Agregamos la propiedad 'bold' al objeto de estilo
                `: ${exp.descripcion} (${exp.fecha}).`
              ],
              link: exp.urlProyecto
            };
          }),
          margin: [15, 0, 0, 0],
        },

        // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 1 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382af ' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },

        // Agrega la sección de Cursos
        {
          text: 'Cursos',
          style: 'sectionHeader',
        },
        {
          margin: [20, 0, 0, 0],
          text: this.data_cursos.map((cursos: any) => {
            return {
              text: `√  ${cursos.curso}       `, bold: true, color: '#1B23A3',
              link: cursos.imgCurso,
              target: 'blank'
            }
          })
        },

         // linea celeste fina
        { margin: [0, 5, 0, 0], table: { headerRows: 1, widths: ['*'], body: [[''], ['']] }, layout: { hLineWidth: function (i: number, node: any) { return (i === 1) ? 1 : 0 }, hLineColor: function (i: number, node: any) { return (i === 1) ? '#5382af ' : 'white' }, vLineWidth: function (i: any, node: any) { return 0 } } },

        {
          columns: [
            {
              stack: [
                {
                  image: await this.getBase64ImageFromURL(this.url_git),
                  link: 'https://github.com/JulioLaz',
                  width: '10%',
                  fit: [30, 30],
                  alignment: 'right',
                  margin: [5, 5, 0, 5],
                },
              ],
            },
            {
              stack: [
                {
                  image: await this.getBase64ImageFromURL(this.url_linkedin),
                  link: 'https://www.linkedin.com/in/julio-lazarte-developer?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bhsvn0lM6QheFxNK9oS5aeA%3D%3D',
                  width: '10%',
                  fit: [20, 20],
                  alignment: 'left',
                  margin: [5, 10, 0, 5],
                },
              ],
            },
          ],
        },
        {
          text: 'Curriculum Vitae generado desde mi Portfolio Web',
          link: this.cv_web,
          fontSize: 10,
          alignment: 'center',
          margin: [5, 0, 0, 0],
          decoration: 'underline',
          color: '#154360',
          target: '_blank',
        },
        {
          text: 'Video tutorial app curriculum web',
          // link: this.video_youtube,
          fontSize: 10,
          alignment: 'center',
          margin: [5, 0, 0, 0],
          decoration: 'underline',
          color: '#2780E3',
          target: '_blank',
        },
        {
          text: '©️ Copyright - 2022',
          fontSize: 10,
          alignment: 'center',
          margin: [5, 0, 0, 5],
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          margin: [0, 0, 0, 10],
          width: 400,
        },
        line: {
          color: 'grey',
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 5],
          // width:400,
        },
        contact: {
          fontSize: 12,
          margin: [0, 0, 0, 0],
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          margin: [10, 5, 0, 5],
          color: '#5382af',
        },
      },
      defaultStyle: {
        font: 'Roboto',
        fontSize: 12,
        lineHeight: 1.2,
        color: '#333',
      },
    };

    // const pdf = pdfMake.createPdf(docDefinition);
    // pdf.open();
  }
  // }
  // if (pdf_do == true) {

  // const pdf = pdfMake.createPdf(docDefinition);
  // pdf.open();


  // } else if (pdf_do == false) {
  // pdfMake.createPdf(docDefinition).download(`curriculum_${this.personas.apellido}_${this.personas.nombre}.pdf`);

  // }

  // } else {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Oops...',
  //     text: 'Elije un Usuario!',
  //   }),
  //     this.router.navigate(['/']);
  // }
  // }

}
