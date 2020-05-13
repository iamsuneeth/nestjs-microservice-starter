
SRC_DIR="./libs/proto/src/proto-defs/*.proto"
DEST_DIR="./protogen"

protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_opt=outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false --ts_proto_out=${DEST_DIR} ${SRC_DIR}