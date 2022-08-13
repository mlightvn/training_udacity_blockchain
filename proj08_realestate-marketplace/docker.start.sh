#!/bin/bash

# https://learn.udacity.com/nanodegrees/nd1309/parts/8f9b0ba4-18c6-4031-a0c0-838c504b3cce/lessons/e6b7081d-803e-49df-90c4-dfbcf61dcb7b/concepts/21e74ed9-d8eb-4f64-9e18-4ef656919a3b
# docker run zokrates/zokrates -v ./zokrates/code/square:/home/zokrates/code -ti
docker run zokrates/zokrates -v ./zokrates/code/square:/project -ti
zokrates/zokrates /bin/bash
