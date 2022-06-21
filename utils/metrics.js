const express = require('express');
const app = express();
const promBundle = require("express-prom-bundle");

// Add the options to the prometheus middleware most option are for http_request_duration_seconds histogram metric
const metricsMiddleware = promBundle({
    includeMethod: true, 
    includePath: true, 
    includeStatusCode: true, 
    includeUp: true,
    promClient: {
        collectDefaultMetrics: {
        }
      }
});


app.get("/metrics",(req,res) => res.json({ 
    "GET /metrics": "Metrics data",
}));

app.get("/metrics", (req,res) => res.json("Metrics data"));

module.exports = metricsMiddleware;
