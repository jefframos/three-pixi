export default class Geo {
    public segWidth: number;
    public segHeight: number;
    public width: number;
    public height: number;

    /**
     * @param width - The width of the plane.
     * @param height - The height of the plane.
     * @param segWidth - Number of horizontal segments.
     * @param segHeight - Number of vertical segments.
     */
    constructor(width = 100, height = 100, segWidth = 10, segHeight = 10) {

        this.segWidth = segWidth;
        this.segHeight = segHeight;

        this.width = width;
        this.height = height;

    }
    
    build(): any {
        const total = this.segWidth * this.segHeight;
        const verts = [];
        const uvs = [];
        const indices = [];

        const segmentsX = this.segWidth - 1;
        const segmentsY = this.segHeight - 1;

        const sizeX = (this.width) / segmentsX;
        const sizeY = (this.height) / segmentsY;

        for (let i = 0; i < total; i++) {
            const x = (i % this.segWidth);
            const y = ((i / this.segWidth) | 0);

            verts.push(x * sizeX, y * sizeY, 0);
            uvs.push(x / segmentsX, y / segmentsY);
        }

        const totalSub = segmentsX * segmentsY;

        for (let i = 0; i < totalSub; i++) {
            const xpos = i % segmentsX;
            const ypos = (i / segmentsX) | 0;

            const value = (ypos * this.segWidth) + xpos;
            const value2 = (ypos * this.segWidth) + xpos + 1;
            const value3 = ((ypos + 1) * this.segWidth) + xpos;
            const value4 = ((ypos + 1) * this.segWidth) + xpos + 1;

            indices.push(value, value2, value3,
                value2, value4, value3);
        }

        return [verts, uvs, indices]
    }
}