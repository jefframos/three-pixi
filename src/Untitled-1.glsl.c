"#version 300 es

#define WEBGL2 1
#define HAS_VERTEX_COLOR_VEC4 1
#define HAS_NORMALS 1
#define HAS_UV_SET1 1
#define HAS_TARGET_POSITION0
#define HAS_TARGET_NORMAL0
#define HAS_TARGET_POSITION1
#define HAS_TARGET_NORMAL1
#define HAS_TARGET_POSITION2
#define HAS_TARGET_NORMAL2
#define HAS_TARGET_POSITION3
#define HAS_TARGET_NORMAL3
#define HAS_TARGET_POSITION4
#define HAS_TARGET_NORMAL4
#define HAS_TARGET_POSITION5
#define HAS_TARGET_NORMAL5
#define HAS_TARGET_POSITION6
#define HAS_TARGET_NORMAL6
#define HAS_TARGET_POSITION7
#define HAS_TARGET_NORMAL7
#define HAS_TARGET_POSITION8
#define HAS_TARGET_NORMAL8
#define HAS_TARGET_POSITION9
#define HAS_TARGET_NORMAL9
#define HAS_TARGET_POSITION10
#define HAS_TARGET_NORMAL10
#define HAS_TARGET_POSITION11
#define HAS_TARGET_NORMAL11
#define HAS_TARGET_POSITION12
#define HAS_TARGET_NORMAL12
#define HAS_TARGET_POSITION13
#define HAS_TARGET_NORMAL13
#define HAS_TARGET_POSITION14
#define HAS_TARGET_NORMAL14
#define HAS_TARGET_POSITION15
#define HAS_TARGET_NORMAL15
#define HAS_TARGET_POSITION16
#define HAS_TARGET_NORMAL16
#define HAS_TARGET_POSITION17
#define HAS_TARGET_NORMAL17
#define HAS_TARGET_POSITION18
#define HAS_TARGET_NORMAL18
#define HAS_TARGET_POSITION19
#define HAS_TARGET_NORMAL19
#define HAS_TARGET_POSITION20
#define HAS_TARGET_NORMAL20
#define HAS_TARGET_POSITION21
#define HAS_TARGET_NORMAL21
#define HAS_TARGET_POSITION22
#define HAS_TARGET_NORMAL22
#define HAS_TARGET_POSITION23
#define HAS_TARGET_NORMAL23
#define HAS_TARGET_POSITION24
#define HAS_TARGET_NORMAL24
#define HAS_TARGET_POSITION25
#define HAS_TARGET_NORMAL25
#define HAS_TARGET_POSITION26
#define HAS_TARGET_NORMAL26
#define HAS_TARGET_POSITION27
#define HAS_TARGET_NORMAL27
#define HAS_TARGET_POSITION28
#define HAS_TARGET_NORMAL28
#define WEIGHT_COUNT 29
#define USE_MORPHING 1
#define HAS_JOINT_SET1 1
#define HAS_WEIGHT_SET1 1
#define USE_SKINNING 1
#define JOINT_COUNT 10
#define USE_SKINNING_TEXTURE 1
#define MATERIAL_METALLICROUGHNESS 1
#define USE_FOG 1
#define LIGHT_COUNT 1
#define USE_PUNCTUAL 1
#define HAS_BASE_COLOR_MAP 1

vec4 _texture(sampler2D sampler, vec2 coord)
{
    #ifdef WEBGL2
    return texture(sampler, coord);
#else
    return texture2D(sampler, coord);
#endif
}

vec4 _texture(samplerCube sampler, vec3 coord)
{
    #ifdef WEBGL2
    return texture(sampler, coord);
#else
    return textureCube(sampler, coord);
#endif
}
#ifdef HAS_TARGET_POSITION0
in vec3 a_Target_Position0;
#endif

#ifdef HAS_TARGET_POSITION1
in vec3 a_Target_Position1;
#endif

#ifdef HAS_TARGET_POSITION2
in vec3 a_Target_Position2;
#endif

#ifdef HAS_TARGET_POSITION3
in vec3 a_Target_Position3;
#endif

#ifdef HAS_TARGET_POSITION4
in vec3 a_Target_Position4;
#endif

#ifdef HAS_TARGET_POSITION5
in vec3 a_Target_Position5;
#endif

#ifdef HAS_TARGET_POSITION6
in vec3 a_Target_Position6;
#endif

#ifdef HAS_TARGET_POSITION7
in vec3 a_Target_Position7;
#endif

#ifdef HAS_TARGET_NORMAL0
in vec3 a_Target_Normal0;
#endif

#ifdef HAS_TARGET_NORMAL1
in vec3 a_Target_Normal1;
#endif

#ifdef HAS_TARGET_NORMAL2
in vec3 a_Target_Normal2;
#endif

#ifdef HAS_TARGET_NORMAL3
in vec3 a_Target_Normal3;
#endif

#ifdef HAS_TARGET_TANGENT0
in vec3 a_Target_Tangent0;
#endif

#ifdef HAS_TARGET_TANGENT1
in vec3 a_Target_Tangent1;
#endif

#ifdef HAS_TARGET_TANGENT2
in vec3 a_Target_Tangent2;
#endif

#ifdef HAS_TARGET_TANGENT3
in vec3 a_Target_Tangent3;
#endif

#ifdef USE_MORPHING
uniform float u_morphWeights[WEIGHT_COUNT];
#endif

#ifdef HAS_JOINT_SET1
in vec4 a_Joint1;
#endif

#ifdef HAS_JOINT_SET2
in vec4 a_Joint2;
#endif

#ifdef HAS_WEIGHT_SET1
in vec4 a_Weight1;
#endif

#ifdef HAS_WEIGHT_SET2
in vec4 a_Weight2;
#endif

#ifdef USE_SKINNING
#ifdef USE_SKINNING_TEXTURE
uniform sampler2D u_jointMatrixSampler;
uniform sampler2D u_jointNormalMatrixSampler;
#else
uniform mat4 u_jointMatrix[JOINT_COUNT];
uniform mat4 u_jointNormalMatrix[JOINT_COUNT];
#endif
#endif

// these offsets assume the texture is 4 pixels across
#define ROW0_U ((0.5 + 0.0) / 4.0)
#define ROW1_U ((0.5 + 1.0) / 4.0)
#define ROW2_U ((0.5 + 2.0) / 4.0)
#define ROW3_U ((0.5 + 3.0) / 4.0)

#ifdef USE_SKINNING
mat4 getJointMatrix(float boneNdx) {
        #ifdef USE_SKINNING_TEXTURE
    float v = (boneNdx + 0.5) / float(JOINT_COUNT);
    return mat4(
            _texture(u_jointMatrixSampler, vec2(ROW0_U, v)),
        _texture(u_jointMatrixSampler, vec2(ROW1_U, v)),
        _texture(u_jointMatrixSampler, vec2(ROW2_U, v)),
        _texture(u_jointMatrixSampler, vec2(ROW3_U, v))
    );
    #else
    return u_jointMatrix[int(boneNdx)];
    #endif
}

mat4 getJointNormalMatrix(float boneNdx) {
        #ifdef USE_SKINNING_TEXTURE
    float v = (boneNdx + 0.5) / float(JOINT_COUNT);
    return mat4(
            _texture(u_jointNormalMatrixSampler, vec2(ROW0_U, v)),
        _texture(u_jointNormalMatrixSampler, vec2(ROW1_U, v)),
        _texture(u_jointNormalMatrixSampler, vec2(ROW2_U, v)),
        _texture(u_jointNormalMatrixSampler, vec2(ROW3_U, v))
    );
    #else
    return u_jointNormalMatrix[int(boneNdx)];
    #endif
}

mat4 getSkinningMatrix()
{
        mat4 skin = mat4(0);

    #if defined(HAS_WEIGHT_SET1) && defined(HAS_JOINT_SET1)
    skin +=
        a_Weight1.x * getJointMatrix(a_Joint1.x) +
        a_Weight1.y * getJointMatrix(a_Joint1.y) +
        a_Weight1.z * getJointMatrix(a_Joint1.z) +
        a_Weight1.w * getJointMatrix(a_Joint1.w);
    #endif

    return skin;
}

mat4 getSkinningNormalMatrix()
{
        mat4 skin = mat4(0);

    #if defined(HAS_WEIGHT_SET1) && defined(HAS_JOINT_SET1)
    skin +=
        a_Weight1.x * getJointNormalMatrix(a_Joint1.x) +
        a_Weight1.y * getJointNormalMatrix(a_Joint1.y) +
        a_Weight1.z * getJointNormalMatrix(a_Joint1.z) +
        a_Weight1.w * getJointNormalMatrix(a_Joint1.w);
    #endif

    return skin;
}
#endif // !USE_SKINNING

#ifdef USE_MORPHING
vec4 getTargetPosition()
{
        vec4 pos = vec4(0);

#ifdef HAS_TARGET_POSITION0
    pos.xyz += u_morphWeights[0] * a_Target_Position0;
#endif

#ifdef HAS_TARGET_POSITION1
    pos.xyz += u_morphWeights[1] * a_Target_Position1;
#endif

#ifdef HAS_TARGET_POSITION2
    pos.xyz += u_morphWeights[2] * a_Target_Position2;
#endif

#ifdef HAS_TARGET_POSITION3
    pos.xyz += u_morphWeights[3] * a_Target_Position3;
#endif

#ifdef HAS_TARGET_POSITION4
    pos.xyz += u_morphWeights[4] * a_Target_Position4;
#endif

    return pos;
}

vec4 getTargetNormal()
{
        vec4 normal = vec4(0);

#ifdef HAS_TARGET_NORMAL0
    normal.xyz += u_morphWeights[0] * a_Target_Normal0;
#endif

#ifdef HAS_TARGET_NORMAL1
    normal.xyz += u_morphWeights[1] * a_Target_Normal1;
#endif

#ifdef HAS_TARGET_NORMAL2
    normal.xyz += u_morphWeights[2] * a_Target_Normal2;
#endif

#ifdef HAS_TARGET_NORMAL3
    normal.xyz += u_morphWeights[3] * a_Target_Normal3;
#endif

#ifdef HAS_TARGET_NORMAL4
    normal.xyz += u_morphWeights[4] * a_Target_Normal4;
#endif

    return normal;
}

vec4 getTargetTangent()
{
        vec4 tangent = vec4(0);

#ifdef HAS_TARGET_TANGENT0
    tangent.xyz += u_morphWeights[0] * a_Target_Tangent0;
#endif

#ifdef HAS_TARGET_TANGENT1
    tangent.xyz += u_morphWeights[1] * a_Target_Tangent1;
#endif

#ifdef HAS_TARGET_TANGENT2
    tangent.xyz += u_morphWeights[2] * a_Target_Tangent2;
#endif

#ifdef HAS_TARGET_TANGENT3
    tangent.xyz += u_morphWeights[3] * a_Target_Tangent3;
#endif

#ifdef HAS_TARGET_TANGENT4
    tangent.xyz += u_morphWeights[4] * a_Target_Tangent4;
#endif

    return tangent;
}

#endif // !USE_MORPHING


in vec4 a_Position;
out vec3 v_Position;

out vec3 v_ModelViewPosition;

#ifdef USE_INSTANCING
in vec4 a_ModelMatrix0;
in vec4 a_ModelMatrix1;
in vec4 a_ModelMatrix2;
in vec4 a_ModelMatrix3;
#endif

#ifdef USE_INSTANCING
in vec4 a_BaseColorFactor;
out vec4 v_BaseColorFactor;
#endif

#ifdef USE_INSTANCING
in vec4 a_NormalMatrix0;
in vec4 a_NormalMatrix1;
in vec4 a_NormalMatrix2;
in vec4 a_NormalMatrix3;
#endif

#ifdef HAS_NORMALS
in vec4 a_Normal;
#endif

#ifdef HAS_TANGENTS
in vec4 a_Tangent;
#endif

#ifdef HAS_NORMALS
#ifdef HAS_TANGENTS
out mat3 v_TBN;
#else
out vec3 v_Normal;
#endif
#endif

#ifdef HAS_UV_SET1
in vec2 a_UV1;
#endif

#ifdef HAS_UV_SET2
in vec2 a_UV2;
#endif

out vec2 v_UVCoord1;
out vec2 v_UVCoord2;

#ifdef HAS_VERTEX_COLOR_VEC3
in vec3 a_Color;
out vec3 v_Color;
#endif

#ifdef HAS_VERTEX_COLOR_VEC4
in vec4 a_Color;
out vec4 v_Color;
#endif

uniform mat4 u_ViewProjectionMatrix;
uniform mat4 u_ModelMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_NormalMatrix;

#ifdef USE_SHADOW_MAPPING
uniform mat4 u_LightViewProjectionMatrix;
out vec4 v_PositionLightSpace;
#endif

vec4 getPosition()
{
        vec4 pos = a_Position;

#ifdef USE_MORPHING
    pos += getTargetPosition();
#endif

#ifdef USE_SKINNING
    pos = getSkinningMatrix() * pos;
#endif

    return pos;
}

#ifdef HAS_NORMALS
vec4 getNormal()
{
        vec4 normal = a_Normal;

#ifdef USE_MORPHING
    normal += getTargetNormal();
#endif

#ifdef USE_SKINNING
    normal = getSkinningNormalMatrix() * normal;
#endif

    return normalize(normal);
}
#endif

#ifdef HAS_TANGENTS
vec4 getTangent()
{
        vec4 tangent = a_Tangent;

#ifdef USE_MORPHING
    tangent += getTargetTangent();
#endif

#ifdef USE_SKINNING
    tangent = getSkinningMatrix() * tangent;
#endif

    return normalize(tangent);
}
#endif

void main()
{
        mat4 modelMatrix = u_ModelMatrix;
    #ifdef USE_INSTANCING
        modelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
    #endif
    vec4 pos = modelMatrix * getPosition();
    v_Position = vec3(pos.xyz) / pos.w;

    vec4 modelViewPosition = u_ViewMatrix * pos;
    v_ModelViewPosition = vec3(modelViewPosition.xyz) / modelViewPosition.w;

    mat4 normalMatrix = u_NormalMatrix;
    #ifdef USE_INSTANCING
        normalMatrix = mat4(a_NormalMatrix0, a_NormalMatrix1, a_NormalMatrix2, a_NormalMatrix3);
    #endif

    #ifdef HAS_NORMALS
    #ifdef HAS_TANGENTS
    vec4 tangent = getTangent();
    vec3 normalW = normalize(vec3(normalMatrix * vec4(getNormal().xyz, 0.0)));
    vec3 tangentW = normalize(vec3(modelMatrix * vec4(tangent.xyz, 0.0)));
    vec3 bitangentW = cross(normalW, tangentW) * tangent.w;
    v_TBN = mat3(tangentW, bitangentW, normalW);
    #else // !HAS_TANGENTS
    v_Normal = normalize(vec3(normalMatrix * vec4(getNormal().xyz, 0.0)));
    #endif
    #endif // !HAS_NORMALS

    v_UVCoord1 = vec2(0.0, 0.0);
    v_UVCoord2 = vec2(0.0, 0.0);

    #ifdef HAS_UV_SET1
    v_UVCoord1 = a_UV1;
    #endif

    #ifdef HAS_UV_SET2
    v_UVCoord2 = a_UV2;
    #endif

    #if defined(HAS_VERTEX_COLOR_VEC3) || defined(HAS_VERTEX_COLOR_VEC4)
    v_Color = a_Color;
    #endif

    #ifdef USE_SHADOW_MAPPING
    v_PositionLightSpace = u_LightViewProjectionMatrix * pos;
    #endif

    #ifdef USE_INSTANCING
    v_BaseColorFactor = a_BaseColorFactor;
    #endif

    gl_Position = u_ViewProjectionMatrix * pos;
}"
