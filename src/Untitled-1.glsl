"#version 300 es\n\n#define WEBGL2 1\n#define HAS_VERTEX_COLOR_VEC4 1\n#define HAS_NORMALS 1\n#define HAS_UV_SET1 1\n#define HAS_TARGET_POSITION0\n#define HAS_TARGET_NORMAL0\n#define HAS_TARGET_POSITION1\n#define HAS_TARGET_NORMAL1\n#define HAS_TARGET_POSITION2\n#define HAS_TARGET_NORMAL2\n#define HAS_TARGET_POSITION3\n#define HAS_TARGET_NORMAL3\n#define HAS_TARGET_POSITION4\n#define HAS_TARGET_NORMAL4\n#define HAS_TARGET_POSITION5\n#define HAS_TARGET_NORMAL5\n#define HAS_TARGET_POSITION6\n#define HAS_TARGET_NORMAL6\n#define HAS_TARGET_POSITION7\n#define HAS_TARGET_NORMAL7\n#define HAS_TARGET_POSITION8\n#define HAS_TARGET_NORMAL8\n#define HAS_TARGET_POSITION9\n#define HAS_TARGET_NORMAL9\n#define HAS_TARGET_POSITION10\n#define HAS_TARGET_NORMAL10\n#define HAS_TARGET_POSITION11\n#define HAS_TARGET_NORMAL11\n#define HAS_TARGET_POSITION12\n#define HAS_TARGET_NORMAL12\n#define HAS_TARGET_POSITION13\n#define HAS_TARGET_NORMAL13\n#define HAS_TARGET_POSITION14\n#define HAS_TARGET_NORMAL14\n#define HAS_TARGET_POSITION15\n#define HAS_TARGET_NORMAL15\n#define HAS_TARGET_POSITION16\n#define HAS_TARGET_NORMAL16\n#define HAS_TARGET_POSITION17\n#define HAS_TARGET_NORMAL17\n#define HAS_TARGET_POSITION18\n#define HAS_TARGET_NORMAL18\n#define HAS_TARGET_POSITION19\n#define HAS_TARGET_NORMAL19\n#define HAS_TARGET_POSITION20\n#define HAS_TARGET_NORMAL20\n#define HAS_TARGET_POSITION21\n#define HAS_TARGET_NORMAL21\n#define HAS_TARGET_POSITION22\n#define HAS_TARGET_NORMAL22\n#define HAS_TARGET_POSITION23\n#define HAS_TARGET_NORMAL23\n#define HAS_TARGET_POSITION24\n#define HAS_TARGET_NORMAL24\n#define HAS_TARGET_POSITION25\n#define HAS_TARGET_NORMAL25\n#define HAS_TARGET_POSITION26\n#define HAS_TARGET_NORMAL26\n#define HAS_TARGET_POSITION27\n#define HAS_TARGET_NORMAL27\n#define HAS_TARGET_POSITION28\n#define HAS_TARGET_NORMAL28\n#define WEIGHT_COUNT 29\n#define USE_MORPHING 1\n#define HAS_JOINT_SET1 1\n#define HAS_WEIGHT_SET1 1\n#define USE_SKINNING 1\n#define JOINT_COUNT 10\n#define USE_SKINNING_TEXTURE 1\n#define MATERIAL_METALLICROUGHNESS 1\n#define USE_FOG 1\n#define LIGHT_COUNT 1\n#define USE_PUNCTUAL 1\n#define HAS_BASE_COLOR_MAP 1\n\nvec4 _texture(sampler2D sampler, vec2 coord)\n{\n#ifdef WEBGL2\n    return texture(sampler, coord);\n#else\n    return texture2D(sampler, coord);\n#endif\n}\n\nvec4 _texture(samplerCube sampler, vec3 coord)\n{\n#ifdef WEBGL2\n    return texture(sampler, coord);\n#else\n    return textureCube(sampler, coord);\n#endif\n}\n#ifdef HAS_TARGET_POSITION0\nin vec3 a_Target_Position0;\n#endif\n\n#ifdef HAS_TARGET_POSITION1\nin vec3 a_Target_Position1;\n#endif\n\n#ifdef HAS_TARGET_POSITION2\nin vec3 a_Target_Position2;\n#endif\n\n#ifdef HAS_TARGET_POSITION3\nin vec3 a_Target_Position3;\n#endif\n\n#ifdef HAS_TARGET_POSITION4\nin vec3 a_Target_Position4;\n#endif\n\n#ifdef HAS_TARGET_POSITION5\nin vec3 a_Target_Position5;\n#endif\n\n#ifdef HAS_TARGET_POSITION6\nin vec3 a_Target_Position6;\n#endif\n\n#ifdef HAS_TARGET_POSITION7\nin vec3 a_Target_Position7;\n#endif\n\n#ifdef HAS_TARGET_NORMAL0\nin vec3 a_Target_Normal0;\n#endif\n\n#ifdef HAS_TARGET_NORMAL1\nin vec3 a_Target_Normal1;\n#endif\n\n#ifdef HAS_TARGET_NORMAL2\nin vec3 a_Target_Normal2;\n#endif\n\n#ifdef HAS_TARGET_NORMAL3\nin vec3 a_Target_Normal3;\n#endif\n\n#ifdef HAS_TARGET_TANGENT0\nin vec3 a_Target_Tangent0;\n#endif\n\n#ifdef HAS_TARGET_TANGENT1\nin vec3 a_Target_Tangent1;\n#endif\n\n#ifdef HAS_TARGET_TANGENT2\nin vec3 a_Target_Tangent2;\n#endif\n\n#ifdef HAS_TARGET_TANGENT3\nin vec3 a_Target_Tangent3;\n#endif\n\n#ifdef USE_MORPHING\nuniform float u_morphWeights[WEIGHT_COUNT];\n#endif\n\n#ifdef HAS_JOINT_SET1\nin vec4 a_Joint1;\n#endif\n\n#ifdef HAS_JOINT_SET2\nin vec4 a_Joint2;\n#endif\n\n#ifdef HAS_WEIGHT_SET1\nin vec4 a_Weight1;\n#endif\n\n#ifdef HAS_WEIGHT_SET2\nin vec4 a_Weight2;\n#endif\n\n#ifdef USE_SKINNING\n#ifdef USE_SKINNING_TEXTURE\nuniform sampler2D u_jointMatrixSampler;\nuniform sampler2D u_jointNormalMatrixSampler;\n#else\nuniform mat4 u_jointMatrix[JOINT_COUNT];\nuniform mat4 u_jointNormalMatrix[JOINT_COUNT];\n#endif\n#endif\n\n// these offsets assume the texture is 4 pixels across\n#define ROW0_U ((0.5 + 0.0) / 4.0)\n#define ROW1_U ((0.5 + 1.0) / 4.0)\n#define ROW2_U ((0.5 + 2.0) / 4.0)\n#define ROW3_U ((0.5 + 3.0) / 4.0)\n\n#ifdef USE_SKINNING\nmat4 getJointMatrix(float boneNdx) {\n    #ifdef USE_SKINNING_TEXTURE\n    float v = (boneNdx + 0.5) / float(JOINT_COUNT);\n    return mat4(\n        _texture(u_jointMatrixSampler, vec2(ROW0_U, v)),\n        _texture(u_jointMatrixSampler, vec2(ROW1_U, v)),\n        _texture(u_jointMatrixSampler, vec2(ROW2_U, v)),\n        _texture(u_jointMatrixSampler, vec2(ROW3_U, v))\n    );\n    #else\n    return u_jointMatrix[int(boneNdx)];\n    #endif\n}\n\nmat4 getJointNormalMatrix(float boneNdx) {\n    #ifdef USE_SKINNING_TEXTURE\n    float v = (boneNdx + 0.5) / float(JOINT_COUNT);\n    return mat4(\n        _texture(u_jointNormalMatrixSampler, vec2(ROW0_U, v)),\n        _texture(u_jointNormalMatrixSampler, vec2(ROW1_U, v)),\n        _texture(u_jointNormalMatrixSampler, vec2(ROW2_U, v)),\n        _texture(u_jointNormalMatrixSampler, vec2(ROW3_U, v))\n    );\n    #else\n    return u_jointNormalMatrix[int(boneNdx)];\n    #endif\n}\n\nmat4 getSkinningMatrix()\n{\n    mat4 skin = mat4(0);\n\n    #if defined(HAS_WEIGHT_SET1) && defined(HAS_JOINT_SET1)\n    skin +=\n        a_Weight1.x * getJointMatrix(a_Joint1.x) +\n        a_Weight1.y * getJointMatrix(a_Joint1.y) +\n        a_Weight1.z * getJointMatrix(a_Joint1.z) +\n        a_Weight1.w * getJointMatrix(a_Joint1.w);\n    #endif\n\n    return skin;\n}\n\nmat4 getSkinningNormalMatrix()\n{\n    mat4 skin = mat4(0);\n\n    #if defined(HAS_WEIGHT_SET1) && defined(HAS_JOINT_SET1)\n    skin +=\n        a_Weight1.x * getJointNormalMatrix(a_Joint1.x) +\n        a_Weight1.y * getJointNormalMatrix(a_Joint1.y) +\n        a_Weight1.z * getJointNormalMatrix(a_Joint1.z) +\n        a_Weight1.w * getJointNormalMatrix(a_Joint1.w);\n    #endif\n\n    return skin;\n}\n#endif // !USE_SKINNING\n\n#ifdef USE_MORPHING\nvec4 getTargetPosition()\n{\n    vec4 pos = vec4(0);\n\n#ifdef HAS_TARGET_POSITION0\n    pos.xyz += u_morphWeights[0] * a_Target_Position0;\n#endif\n\n#ifdef HAS_TARGET_POSITION1\n    pos.xyz += u_morphWeights[1] * a_Target_Position1;\n#endif\n\n#ifdef HAS_TARGET_POSITION2\n    pos.xyz += u_morphWeights[2] * a_Target_Position2;\n#endif\n\n#ifdef HAS_TARGET_POSITION3\n    pos.xyz += u_morphWeights[3] * a_Target_Position3;\n#endif\n\n#ifdef HAS_TARGET_POSITION4\n    pos.xyz += u_morphWeights[4] * a_Target_Position4;\n#endif\n\n    return pos;\n}\n\nvec4 getTargetNormal()\n{\n    vec4 normal = vec4(0);\n\n#ifdef HAS_TARGET_NORMAL0\n    normal.xyz += u_morphWeights[0] * a_Target_Normal0;\n#endif\n\n#ifdef HAS_TARGET_NORMAL1\n    normal.xyz += u_morphWeights[1] * a_Target_Normal1;\n#endif\n\n#ifdef HAS_TARGET_NORMAL2\n    normal.xyz += u_morphWeights[2] * a_Target_Normal2;\n#endif\n\n#ifdef HAS_TARGET_NORMAL3\n    normal.xyz += u_morphWeights[3] * a_Target_Normal3;\n#endif\n\n#ifdef HAS_TARGET_NORMAL4\n    normal.xyz += u_morphWeights[4] * a_Target_Normal4;\n#endif\n\n    return normal;\n}\n\nvec4 getTargetTangent()\n{\n    vec4 tangent = vec4(0);\n\n#ifdef HAS_TARGET_TANGENT0\n    tangent.xyz += u_morphWeights[0] * a_Target_Tangent0;\n#endif\n\n#ifdef HAS_TARGET_TANGENT1\n    tangent.xyz += u_morphWeights[1] * a_Target_Tangent1;\n#endif\n\n#ifdef HAS_TARGET_TANGENT2\n    tangent.xyz += u_morphWeights[2] * a_Target_Tangent2;\n#endif\n\n#ifdef HAS_TARGET_TANGENT3\n    tangent.xyz += u_morphWeights[3] * a_Target_Tangent3;\n#endif\n\n#ifdef HAS_TARGET_TANGENT4\n    tangent.xyz += u_morphWeights[4] * a_Target_Tangent4;\n#endif\n\n    return tangent;\n}\n\n#endif // !USE_MORPHING\n\n\nin vec4 a_Position;\nout vec3 v_Position;\n\nout vec3 v_ModelViewPosition;\n\n#ifdef USE_INSTANCING\nin vec4 a_ModelMatrix0;\nin vec4 a_ModelMatrix1;\nin vec4 a_ModelMatrix2;\nin vec4 a_ModelMatrix3;\n#endif\n\n#ifdef USE_INSTANCING\nin vec4 a_BaseColorFactor;\nout vec4 v_BaseColorFactor;\n#endif\n\n#ifdef USE_INSTANCING\nin vec4 a_NormalMatrix0;\nin vec4 a_NormalMatrix1;\nin vec4 a_NormalMatrix2;\nin vec4 a_NormalMatrix3;\n#endif\n\n#ifdef HAS_NORMALS\nin vec4 a_Normal;\n#endif\n\n#ifdef HAS_TANGENTS\nin vec4 a_Tangent;\n#endif\n\n#ifdef HAS_NORMALS\n#ifdef HAS_TANGENTS\nout mat3 v_TBN;\n#else\nout vec3 v_Normal;\n#endif\n#endif\n\n#ifdef HAS_UV_SET1\nin vec2 a_UV1;\n#endif\n\n#ifdef HAS_UV_SET2\nin vec2 a_UV2;\n#endif\n\nout vec2 v_UVCoord1;\nout vec2 v_UVCoord2;\n\n#ifdef HAS_VERTEX_COLOR_VEC3\nin vec3 a_Color;\nout vec3 v_Color;\n#endif\n\n#ifdef HAS_VERTEX_COLOR_VEC4\nin vec4 a_Color;\nout vec4 v_Color;\n#endif\n\nuniform mat4 u_ViewProjectionMatrix;\nuniform mat4 u_ModelMatrix;\nuniform mat4 u_ViewMatrix;\nuniform mat4 u_NormalMatrix;\n\n#ifdef USE_SHADOW_MAPPING\nuniform mat4 u_LightViewProjectionMatrix;\nout vec4 v_PositionLightSpace;\n#endif\n\nvec4 getPosition()\n{\n    vec4 pos = a_Position;\n\n#ifdef USE_MORPHING\n    pos += getTargetPosition();\n#endif\n\n#ifdef USE_SKINNING\n    pos = getSkinningMatrix() * pos;\n#endif\n\n    return pos;\n}\n\n#ifdef HAS_NORMALS\nvec4 getNormal()\n{\n    vec4 normal = a_Normal;\n\n#ifdef USE_MORPHING\n    normal += getTargetNormal();\n#endif\n\n#ifdef USE_SKINNING\n    normal = getSkinningNormalMatrix() * normal;\n#endif\n\n    return normalize(normal);\n}\n#endif\n\n#ifdef HAS_TANGENTS\nvec4 getTangent()\n{\n    vec4 tangent = a_Tangent;\n\n#ifdef USE_MORPHING\n    tangent += getTargetTangent();\n#endif\n\n#ifdef USE_SKINNING\n    tangent = getSkinningMatrix() * tangent;\n#endif\n\n    return normalize(tangent);\n}\n#endif\n\nvoid main()\n{\n    mat4 modelMatrix = u_ModelMatrix;\n    #ifdef USE_INSTANCING\n        modelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);\n    #endif\n    vec4 pos = modelMatrix * getPosition();\n    v_Position = vec3(pos.xyz) / pos.w;\n\n    vec4 modelViewPosition = u_ViewMatrix * pos;\n    v_ModelViewPosition = vec3(modelViewPosition.xyz) / modelViewPosition.w;\n\n    mat4 normalMatrix = u_NormalMatrix;\n    #ifdef USE_INSTANCING\n        normalMatrix = mat4(a_NormalMatrix0, a_NormalMatrix1, a_NormalMatrix2, a_NormalMatrix3);\n    #endif\n\n    #ifdef HAS_NORMALS\n    #ifdef HAS_TANGENTS\n    vec4 tangent = getTangent();\n    vec3 normalW = normalize(vec3(normalMatrix * vec4(getNormal().xyz, 0.0)));\n    vec3 tangentW = normalize(vec3(modelMatrix * vec4(tangent.xyz, 0.0)));\n    vec3 bitangentW = cross(normalW, tangentW) * tangent.w;\n    v_TBN = mat3(tangentW, bitangentW, normalW);\n    #else // !HAS_TANGENTS\n    v_Normal = normalize(vec3(normalMatrix * vec4(getNormal().xyz, 0.0)));\n    #endif\n    #endif // !HAS_NORMALS\n\n    v_UVCoord1 = vec2(0.0, 0.0);\n    v_UVCoord2 = vec2(0.0, 0.0);\n\n    #ifdef HAS_UV_SET1\n    v_UVCoord1 = a_UV1;\n    #endif\n\n    #ifdef HAS_UV_SET2\n    v_UVCoord2 = a_UV2;\n    #endif\n\n    #if defined(HAS_VERTEX_COLOR_VEC3) || defined(HAS_VERTEX_COLOR_VEC4)\n    v_Color = a_Color;\n    #endif\n\n    #ifdef USE_SHADOW_MAPPING\n    v_PositionLightSpace = u_LightViewProjectionMatrix * pos;\n    #endif\n\n    #ifdef USE_INSTANCING\n    v_BaseColorFactor = a_BaseColorFactor;\n    #endif\n\n    gl_Position = u_ViewProjectionMatrix * pos;\n}"
