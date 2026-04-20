#!/bin/sh

echo ">>> Waiting for Ollama to be ready..."
sleep 8

echo ">>> Pulling qwen3:4b..."
curl -s http://ollama:11434/api/pull \
  -H "Content-Type: application/json" \
  --max-time 300 \
  -d '{"name": "qwen3:4b"}'

echo ""
echo ">>> Registering qwen3-fast (small context)..."
curl -s http://ollama:11434/api/create \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"qwen3-fast\",
    \"from\": \"qwen3:4b\",
    \"parameters\": {
      \"num_gpu\": 36,
      \"num_ctx\": 4096,
      \"num_thread\": $NUM_THREAD
    }
  }"

echo ""
echo ">>> Registering qwen3-deep (large context)..."
curl -s http://ollama:11434/api/create \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"qwen3-deep\",
    \"from\": \"qwen3:4b\",
    \"parameters\": {
      \"num_gpu\": 36,
      \"num_ctx\": 8192,
      \"num_thread\": $NUM_THREAD
    }
  }"

echo ""
echo ">>> Done! Registered models:"
curl -s http://ollama:11434/api/tags | grep -o '"name":"[^"]*"'