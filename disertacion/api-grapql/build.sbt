lazy val akkaHttpVersion = "10.5.3"
lazy val akkaVersion    = "2.8.5"
lazy val json4sVersion  = "4.0.7"

fork := true

lazy val root = (project in file(".")).
  settings(
    inThisBuild(List(
      organization    := "com.example",
      scalaVersion    := "2.13.12"
    )),
    name := "API-GRAPHQL",
    libraryDependencies ++= Seq(
      // Akka HTTP
      "com.typesafe.akka" %% "akka-http"                % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-spray-json"     % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-actor-typed"         % akkaVersion,
      "com.typesafe.akka" %% "akka-stream"              % akkaVersion,
      "ch.qos.logback"    % "logback-classic"           % "1.4.11",

      // JSON4s - versiones consistentes
      "org.json4s" %% "json4s-native" % json4sVersion,
      "org.json4s" %% "json4s-jackson" % json4sVersion,
      "org.json4s" %% "json4s-core" % json4sVersion,

      // GraphQL - versiones compatibles
      "org.sangria-graphql" %% "sangria" % "3.5.3",
      "org.sangria-graphql" %% "sangria-json4s-native" % "1.0.2",
      
      // Integración Akka HTTP con JSON4s
      "de.heikoseeberger" %% "akka-http-json4s" % "1.39.2",

      // Testing
      "com.typesafe.akka" %% "akka-http-testkit"        % akkaHttpVersion % Test,
      "com.typesafe.akka" %% "akka-actor-testkit-typed" % akkaVersion     % Test,
      "org.scalatest"     %% "scalatest"                % "3.2.17"        % Test
    ),
    
    // Resolver conflictos de dependencias
    dependencyOverrides ++= Seq(
      "org.json4s" %% "json4s-core" % json4sVersion,
      "org.json4s" %% "json4s-native" % json4sVersion,
      "org.json4s" %% "json4s-jackson" % json4sVersion
    )
  )