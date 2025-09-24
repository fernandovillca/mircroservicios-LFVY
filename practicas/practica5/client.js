// client.js
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

const client = new proto.EstudianteCursoService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Datos de prueba
const estudiante = {
  ci: "1111111",
  nombres: "Ana",
  apellidos: "Lopez",
  carrera: "Sistemas",
};
const curso1 = {
  codigo: "MAT101",
  nombre: "Matemática I",
  docente: "Dr. Pérez",
};
const curso2 = {
  codigo: "PROG201",
  nombre: "Programación II",
  docente: "Ing. García",
};

function handleError(err) {
  if (!err) return;
  console.error("RPC Error:", err.code, err.message);
}

// Registrar estudiante
client.AgregarEstudiante(estudiante, (err, resp) => {
  if (err) {
    handleError(err);
    return;
  }
  console.log("Estudiante registrado:", resp.estudiante);

  // Registrar dos cursos
  client.AgregarCurso(curso1, (err, resp1) => {
    if (err) {
      handleError(err);
      return;
    }
    console.log("Curso registrado:", resp1.curso);

    client.AgregarCurso(curso2, (err, resp2) => {
      if (err) {
        handleError(err);
        return;
      }
      console.log("Curso registrado:", resp2.curso);

      // Inscribir al estudiante en ambos cursos
      client.InscribirEstudiante(
        { ci: estudiante.ci, codigo: curso1.codigo },
        (err, respI1) => {
          if (err) {
            handleError(err);
            return;
          }
          console.log(respI1.mensaje);

          client.InscribirEstudiante(
            { ci: estudiante.ci, codigo: curso2.codigo },
            (err, respI2) => {
              if (err) {
                handleError(err);
                return;
              }
              console.log(respI2.mensaje);

              // Consultar los cursos del estudiante
              client.ListarCursosDeEstudiante(
                { ci: estudiante.ci },
                (err, respC) => {
                  if (err) {
                    handleError(err);
                    return;
                  }
                  console.log(`Cursos de ${estudiante.ci}:`, respC.cursos);

                  // Consultar estudiantes de un curso
                  client.ListarEstudiantesDeCurso(
                    { codigo: curso1.codigo },
                    (err, respE) => {
                      if (err) {
                        handleError(err);
                        return;
                      }
                      console.log(
                        `Estudiantes en ${curso1.codigo}:`,
                        respE.estudiantes
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  });
});
