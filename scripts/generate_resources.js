import fs from 'fs';
import path from 'path';

const sb3Dir = path.resolve('public/resources/sb3');
const imgDir = path.resolve('public/resources/images');

fs.mkdirSync(sb3Dir, { recursive: true });
fs.mkdirSync(imgDir, { recursive: true });

// Helper to create a valid minimal SB3 structure
const createSb3Project = (name, targets) => {
  return JSON.stringify({
    targets: targets || [
      {
        isStage: true,
        name: "Stage",
        variables: {
          "score_var": ["score", 0],
          "speed_var": ["speed", -15]
        },
        lists: {},
        broadcasts: {
          "msg_encender": "encender",
          "msg_apagar": "apagar",
          "msg_gameover": "Game Over",
          "msg_youwin": "You Win"
        },
        customVars: [],
        blocks: {},
        comments: {},
        currentCostume: 0,
        costumes: [
          {
            name: "backdrop1",
            dataFormat: "svg",
            assetId: "cd28dddb350c25240c309f93f368cb09",
            md5ext: "cd28dddb350c25240c309f93f368cb09.svg",
            rotationCenterX: 240,
            rotationCenterY: 180
          }
        ],
        sounds: [],
        volume: 100,
        layerOrder: 0
      },
      {
        isStage: false,
        name: "Niko",
        variables: {},
        lists: {},
        broadcasts: {},
        blocks: {},
        comments: {},
        currentCostume: 0,
        costumes: [
          {
            name: "niko_stand",
            dataFormat: "png",
            assetId: "niko_asset_01",
            md5ext: "niko_asset_01.png",
            rotationCenterX: 50,
            rotationCenterY: 100
          }
        ],
        sounds: [],
        volume: 100,
        visible: true,
        x: 0,
        y: 0,
        size: 70,
        direction: 90,
        draggable: false,
        rotationStyle: "all around"
      }
    ],
    monitors: [],
    extensions: ["faceDetection", "speechRecognition", "text2speech"],
    meta: {
      semver: "3.0.0",
      vm: "1.2.0",
      agent: "PictoBlox-AI-Roboticoss",
      projectName: name
    }
  }, null, 2);
};

const sb3Files = [
  { name: "Hola_mundo.sb3", title: "Hola Mundo - Primeros pasos en PictoBlox" },
  { name: "Deteccion_de_rostros.sb3", title: "Detección de Rostros con IA" },
  { name: "Gato_y_Raton_IA.sb3", title: "Gato y Ratón IA - Control con Nariz" },
  { name: "Flappy_Bird_IA.sb3", title: "Flappy Bird IA - Control de Vuelo con IA" },
  { name: "Batalla_Espacial_IA.sb3", title: "Batalla Espacial con IA" },
  { name: "Reconocimiento_facial.sb3", title: "Reconocimiento Facial - Persona Especial" },
  { name: "Puerta_inteligente.sb3", title: "Puerta Inteligente con Reconocimiento Facial" },
  { name: "Reconocimiento_de_voz.sb3", title: "Reconocimiento de Voz - Modo Loro" },
  { name: "Casa_inteligente.sb3", title: "Casa Inteligente - Luces que obedecen tu voz" }
];

sb3Files.forEach(file => {
  const filePath = path.join(sb3Dir, file.name);
  const content = createSb3Project(file.title);
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`Generated ${sb3Files.length} SB3 project files in ${sb3Dir}`);
