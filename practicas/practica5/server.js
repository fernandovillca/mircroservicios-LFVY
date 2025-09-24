// server.js
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(
  process.cwd(),
  "proto",
  "estudiantes-cursos.proto"
);
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).estudiantes;

const estudiantes = new Map();
const cursos = new Map();

const inscripcionesEstudiante = new Map();
const inscripcionesCurso = new Map();

function existsEstudiante(ci) {
  return estudiantes.has(ci);
}
function existsCurso(codigo) {
  return cursos.has(codigo);
}

const serviceImpl = {
  AgregarEstudiante: (call, callback) => {
    const est = call.request;
    if (estudiantes.has(est.ci)) {
      return callback({
        code: grpc.status.ALREADY_EXISTS,
        message: `Estudiante con CI ${est.ci} ya existe`,
      });
    }
    estudiantes.set(est.ci, est);
    inscripcionesEstudiante.set(est.ci, new Set());
    callback(null, { estudiante: est });
  },

  AgregarCurso: (call, callback) => {
    const curso = call.request;
    if (cursos.has(curso.codigo)) {
      return callback({
        code: grpc.status.ALREADY_EXISTS,
        message: `Curso con código ${curso.codigo} ya existe`,
      });
    }
    cursos.set(curso.codigo, curso);
    inscripcionesCurso.set(curso.codigo, new Set());
    callback(null, { curso });
  },

  InscribirEstudiante: (call, callback) => {
    const { ci, codigo } = call.request;

    if (!existsEstudiante(ci)) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: `Estudiante con CI ${ci} no existe`,
      });
    }
    if (!existsCurso(codigo)) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: `Curso con código ${codigo} no existe`,
      });
    }

    const setCursos = inscripcionesEstudiante.get(ci);
    if (setCursos.has(codigo)) {
      return callback({
        code: grpc.status.ALREADY_EXISTS,
        message: `Estudiante ${ci} ya está inscrito en el curso ${codigo}`,
      });
    }

    setCursos.add(codigo);
    inscripcionesCurso.get(codigo).add(ci);

    callback(null, { mensaje: `Inscripción exitosa de ${ci} en ${codigo}` });
  },

  ListarCursosDeEstudiante: (call, callback) => {
    const { ci } = call.request;
    if (!existsEstudiante(ci)) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: `Estudiante con CI ${ci} no existe`,
      });
    }
    const codigos = Array.from(inscripcionesEstudiante.get(ci) || []);
    const listaCursos = codigos.map((cod) => cursos.get(cod)).filter(Boolean);
    callback(null, { cursos: listaCursos });
  },

  ListarEstudiantesDeCurso: (call, callback) => {
    const { codigo } = call.request;
    if (!existsCurso(codigo)) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: `Curso con código ${codigo} no existe`,
      });
    }
    const cis = Array.from(inscripcionesCurso.get(codigo) || []);
    const listaEstudiantes = cis
      .map((ci) => estudiantes.get(ci))
      .filter(Boolean);
    callback(null, { estudiantes: listaEstudiantes });
  },
};

// Levantar servidor
const server = new grpc.Server();
server.addService(proto.EstudianteCursoService.service, serviceImpl);

const PORT = "50051";
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, bindPort) => {
    if (err) {
      console.error("Error al bind:", err);
      return;
    }
    console.log(`Servidor gRPC escuchando en ${bindPort}`);
    server.start();
  }
);
