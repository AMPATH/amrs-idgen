var JsBarcode = require('jsbarcode');
var Canvas = require("canvas");

function textToBase64Barcode(text) {
  var canvas = new Canvas();
  JsBarcode(canvas, text, {
    format: "CODE128"
  });
  return canvas.toDataURL("image/png");
}
module.exports = {
  getPageData : function (range){

    return {
      content: [{
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          // headerRows: 1,
          widths: ['*', '*'],
          body: [
            [{
              stack: [{
                  canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 20,
                    x2: 130,
                    y2: 20,
                    lineWidth: 1
                  }, {
                    type: 'line',
                    x1: 140,
                    y1: 20,
                    x2: 260,
                    y2: 20,
                    lineWidth: 1
                  }, ]
                }, {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [{
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Date Issued'],
                          ]
                        }
                      }, {
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Assigning location'],
                          ]
                        }
                      }],
                    ]
                  },
                  layout: 'headerLineOnly'
                },
                {
                  image: textToBase64Barcode(range[0]),
                  height: 100,
                  width: 260
                }
              ]
            }, {
              stack: [{
                  canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 20,
                    x2: 130,
                    y2: 20,
                    lineWidth: 1
                  }, {
                    type: 'line',
                    x1: 140,
                    y1: 20,
                    x2: 260,
                    y2: 20,
                    lineWidth: 1
                  }, ]
                }, {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [{
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Date Issued'],
                          ]
                        }
                      }, {
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Assigning location'],
                          ]
                        }
                      }],
                    ]
                  },
                  layout: 'headerLineOnly'
                },
                {
                  image: textToBase64Barcode(range[1]),
                  height: 100,
                  width: 260
                }
              ]
            }],
            [{
              stack: [{
                  canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 20,
                    x2: 130,
                    y2: 20,
                    lineWidth: 1
                  }, {
                    type: 'line',
                    x1: 140,
                    y1: 20,
                    x2: 260,
                    y2: 20,
                    lineWidth: 1
                  }, ]
                }, {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [{
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Date Issued'],
                          ]
                        }
                      }, {
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Assigning location'],
                          ]
                        }
                      }],
                    ]
                  },
                  layout: 'headerLineOnly'
                },
                {
                  image: textToBase64Barcode(range[2]),
                  height: 100,
                  width: 260
                }
              ]
            }, {
              stack: [{
                  canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 20,
                    x2: 130,
                    y2: 20,
                    lineWidth: 1
                  }, {
                    type: 'line',
                    x1: 140,
                    y1: 20,
                    x2: 260,
                    y2: 20,
                    lineWidth: 1
                  }, ]
                }, {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [{
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Date Issued'],
                          ]
                        }
                      }, {
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Assigning location'],
                          ]
                        }
                      }],
                    ]
                  },
                  layout: 'headerLineOnly'
                },
                {
                  image: textToBase64Barcode(range[3]),
                  height: 100,
                  width: 260
                }
              ]
            }],
            [{
              stack: [{
                  canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 20,
                    x2: 130,
                    y2: 20,
                    lineWidth: 1
                  }, {
                    type: 'line',
                    x1: 140,
                    y1: 20,
                    x2: 260,
                    y2: 20,
                    lineWidth: 1
                  }, ]
                }, {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [{
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Date Issued'],
                          ]
                        }
                      }, {
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Assigning location'],
                          ]
                        }
                      }],
                    ]
                  },
                  layout: 'headerLineOnly'
                },
                {
                  image: textToBase64Barcode(range[4]),
                  height: 100,
                  width: 260
                }
              ]
            }, {
              stack: [{
                  canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 20,
                    x2: 130,
                    y2: 20,
                    lineWidth: 1
                  }, {
                    type: 'line',
                    x1: 140,
                    y1: 20,
                    x2: 260,
                    y2: 20,
                    lineWidth: 1
                  }, ]
                }, {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [{
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Date Issued'],
                          ]
                        }
                      }, {
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Assigning location'],
                          ]
                        }
                      }],
                    ]
                  },
                  layout: 'headerLineOnly'
                },
                {
                  image: textToBase64Barcode(range[5]),
                  height: 100,
                  width: 260
                }
              ]
            }],
            [{
              stack: [{
                  canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 20,
                    x2: 130,
                    y2: 20,
                    lineWidth: 1
                  }, {
                    type: 'line',
                    x1: 140,
                    y1: 20,
                    x2: 260,
                    y2: 20,
                    lineWidth: 1
                  }, ]
                }, {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [{
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Date Issued'],
                          ]
                        }
                      }, {
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Assigning location'],
                          ]
                        }
                      }],
                    ]
                  },
                  layout: 'headerLineOnly'
                },
                {
                  image: textToBase64Barcode(range[6]),
                  height: 100,
                  width: 260
                }
              ]
            }, {
              stack: [{
                  canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 20,
                    x2: 130,
                    y2: 20,
                    lineWidth: 1
                  }, {
                    type: 'line',
                    x1: 140,
                    y1: 20,
                    x2: 260,
                    y2: 20,
                    lineWidth: 1
                  }, ]
                }, {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [{
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Date Issued'],
                          ]
                        }
                      }, {
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Assigning location'],
                          ]
                        }
                      }],
                    ]
                  },
                  layout: 'headerLineOnly'
                },
                {
                  image: textToBase64Barcode(range[7]),
                  height: 100,
                  width: 260
                }
              ]
            }],
            [{
              stack: [{
                  canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 20,
                    x2: 130,
                    y2: 20,
                    lineWidth: 1
                  }, {
                    type: 'line',
                    x1: 140,
                    y1: 20,
                    x2: 260,
                    y2: 20,
                    lineWidth: 1
                  }, ]
                }, {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [{
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Date Issued'],
                          ]
                        }
                      }, {
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Assigning location'],
                          ]
                        }
                      }],
                    ]
                  },
                  layout: 'headerLineOnly'
                },
                {
                  image: textToBase64Barcode(range[8]),
                  height: 100,
                  width: 260
                }
              ]
            }, {
              stack: [{
                  canvas: [{
                    type: 'line',
                    x1: 0,
                    y1: 20,
                    x2: 130,
                    y2: 20,
                    lineWidth: 1
                  }, {
                    type: 'line',
                    x1: 140,
                    y1: 20,
                    x2: 260,
                    y2: 20,
                    lineWidth: 1
                  }, ]
                }, {
                  table: {
                    widths: ['*', '*'],
                    body: [
                      [{
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Date Issued'],
                          ]
                        }
                      }, {
                        layout: 'headerLineOnly',
                        table: {
                          body: [
                            ['Assigning location'],
                          ]
                        }
                      }],
                    ]
                  },
                  layout: 'headerLineOnly'
                },
                {
                  image: textToBase64Barcode(range[9]),
                  height: 100,
                  width: 260
                }
              ]
            }]
          ]
        },
        pageBreak: 'after'
      }]
    }
  }
};