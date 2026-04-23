#!/bin/sh

echo ">>> Waiting for Ollama to be ready..."
sleep 8

echo ">>> Pulling deepseek-r1..."
curl -s http://ollama:11434/api/pull \
  -H "Content-Type: application/json" \
  --max-time 300 \
  -d '{"name": "deepseek-r1:7b"}'

echo ""
echo ">>> Registering deepseek ..."
curl -s http://ollama:11434/api/create \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"deepseek\",
    \"from\": \"deepseek-r1:7b\",
    \"parameters\": {
      \"num_gpu\": 15,
      \"num_ctx\": 4096,
      \"num_thread\": $NUM_THREAD
    }
  }"

echo ""
echo ">>> Done! Registered model:"
curl -s http://ollama:11434/api/tags | grep -o '"name":"[^"]*"'