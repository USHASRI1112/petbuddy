describe("Test for URL", () => {
    afterEach(() => {
        jest.resetModules();
    });

    it("should be correct for android", () => {
        jest.doMock("react-native", () => ({
            Platform: { OS: "android" },
        }));
        
        const { API_URL } = require("../API");
        expect(API_URL).toBe(`https://petbuddy-backend-4.onrender.com/api/`);
    });

    it("should be correct for ios", () => {
        jest.doMock("react-native", () => ({
            Platform: { OS: "ios" },
        }));
        
        const { API_URL } = require("../API");
        expect(API_URL).toBe(`https://petbuddy-backend-4.onrender.com/api/`);
    });
});
