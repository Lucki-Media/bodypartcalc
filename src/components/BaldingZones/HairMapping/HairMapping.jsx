import React from 'react';
import ImageMapper from 'react-img-mapper';
// import styles from './HairMap.module.css';
import side_img from "../../../image/side_img.png";
import top_img from "../../../image/top_img.png";

const HairMapping = () => {
    const MAP = {
        name: "my-map",
        areas: [
            { name: "1", shape: "poly", coords: [117, 99, 125, 97, 132, 95, 140, 94, 147, 93, 152, 92, 150, 99, 148, 107, 145, 115, 142, 120, 140, 127, 135, 131, 133, 119, 129, 111, 125, 106], strokeColor: "#ffffff8c", fillColor: "#ffffff8c" },

            { name: "2", shape: "poly", coords: [78, 93, 84, 86, 89, 79, 96, 76, 102, 71, 110, 76, 114, 80, 119, 83, 124, 85, 130, 88, 135, 90, 141, 92, 148, 93, 154, 93, 134, 96, 122, 98, 116, 100, 108, 101, 98, 102, 88, 100], strokeColor: "#ffffff8c", fillColor: "#ffffff8c" },

            { name: "3", shape: "#ffffff8c", coords: [104,69,112,65,120,61,126,58,134,53,141,53,145,51,150,57,152,63,155,73,156,79,155,89,145,91,134,90,128,86,119,83,111,76], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },

            { name: "4", shape: "poly", coords: [149, 49, 154, 59, 155, 65, 156, 72, 157, 79, 156, 86, 156, 92, 155, 98, 154, 104, 152, 109, 148, 117, 144, 126, 154, 119, 164, 112, 174, 106, 180, 103, 187, 100, 195, 97, 201, 96, 209, 95, 218, 94, 225, 94, 233, 93, 220, 85, 212, 78, 203, 69, 198, 63, 193, 56, 188, 48, 178, 46, 166, 45, 155, 46], fillColor: "ffffff8c", strokeColor: "#ffffff8c" },

            { name: "5", shape: "poly", coords: [302, 156, 288, 158, 277, 161, 261, 161, 247, 157, 240, 155, 229, 150, 222, 143, 216, 137, 206, 131, 198, 127, 191, 124, 180, 122, 168, 121, 159, 124, 148, 127, 153, 120, 161, 116, 167, 109, 179, 106, 186, 103, 199, 100, 206, 98, 214, 97, 225, 98, 236, 97, 247, 97, 258, 99, 270, 102, 281, 104, 287, 106, 294, 109, 299, 119, 302, 132, 301, 142, 302, 149], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },

                      { name: "6", shape: "poly", coords: [194,52,198,60,201,65,206,70,210,76,215,78,219,82,224,85,229,88,234,91,239,95,246,96,253,98,259,99,266,100,271,101,276,102,281,103,286,104,296,110,290,101,285,94,277,87,272,82,266,81,259,79,252,78,243,75,235,74,227,69,220,66,214,63,206,59 ] },


            { name: "7", shape: "poly", coords: [302, 156, 288, 158, 277, 161, 261, 161, 247, 157, 240, 155, 229, 150, 222, 143, 216, 137, 206, 131, 198, 127, 191, 124, 180, 122, 168, 121, 159, 124, 148, 127, 153, 120, 161, 116, 167, 109, 179, 106, 186, 103, 199, 100, 206, 98, 214, 97, 225, 98, 236, 97, 247, 97, 258, 99, 270, 102, 281, 104, 287, 106, 294, 109, 299, 119, 302, 132, 301, 142, 302, 149], fillColor: "#ffffff8c", strokeColor: "#ffffff8c" },
        ]
    };
    const MAP2 = {
        name: "my-map2",
        areas: [
            { name: "1", shape: "poly", coords: [25, 33, 27, 300, 128, 240, 128, 94], fillColor: "#ffffff8c" },
            { name: "2", shape: "poly", coords: [219, 118, 220, 210, 283, 210, 284, 119], fillColor: "#ffffff8c" },
            { name: "3", shape: "poly", coords: [381, 241, 383, 94, 462, 53, 457, 282], fillColor: "#ffffff8c" },
            { name: "4", shape: "poly", coords: [245, 285, 290, 285, 274, 239, 249, 238], fillColor: "#ffffff8c" },
            { name: "5", shape: "poly", coords: [245, 285, 290, 285, 274, 239, 249, 238], fillColor: "#ffffff8c" },
            { name: "6", shape: "poly", coords: [245, 285, 290, 285, 274, 239, 249, 238], fillColor: "#ffffff8c" },
            { name: "7", shape: "poly", coords: [245, 285, 290, 285, 274, 239, 249, 238], fillColor: "#ffffff8c" },
        ]
    };


    return (
        <div className="container">
            <ImageMapper
                src={side_img}
                map={MAP}

            />
            <ImageMapper
                src={top_img}
                map={MAP2}
            />
        </div>
    );
};

export default HairMapping;
