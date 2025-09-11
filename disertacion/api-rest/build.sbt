val toolkitV = "0.5.0"
val toolkit = "org.scala-lang" %% "toolkit" % toolkitV
val toolkitTest = "org.scala-lang" %% "toolkit-test" % toolkitV

ThisBuild / scalaVersion := "3.3.4"

lazy val root = project
  .in(file("."))
  .settings(
    name := "practica-5",
    version := "0.1.0-SNAPSHOT",
    libraryDependencies ++= Seq(
      toolkit,
      toolkitTest % Test,
      
      // Akka HTTP para la API REST
      "com.typesafe.akka" %% "akka-http" % "10.5.3",
      "com.typesafe.akka" %% "akka-actor-typed" % "2.8.5",
      "com.typesafe.akka" %% "akka-stream" % "2.8.5",
      
      // JSON support
      "com.typesafe.akka" %% "akka-http-spray-json" % "10.5.3",
      
      // MySQL connector
      "mysql" % "mysql-connector-java" % "8.0.33",
      
      // Slick para ORM - versiones compatibles con Scala 3
      "com.typesafe.slick" %% "slick" % "3.5.1",
      "com.typesafe.slick" %% "slick-hikaricp" % "3.5.1",
      
      // Logging
      "ch.qos.logback" % "logback-classic" % "1.4.11",
      
      // Testing
      "org.scalatest" %% "scalatest" % "3.2.17" % Test,
      "com.typesafe.akka" %% "akka-http-testkit" % "10.5.3" % Test
    )
  )