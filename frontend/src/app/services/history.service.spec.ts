import { TestBed } from "@angular/core/testing";

import { HistoryService } from "./history.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe("HistoryService", () => {
    let service: HistoryService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
        });
        service = TestBed.inject(HistoryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should send a POST request to save equation", () => {
        const userId = "123";
        const equation = "2 + 2 = 4";

        service.saveEquation(userId, equation).subscribe(res => {
            expect(res).toBeTruthy();
        });

        const req = httpMock.expectOne(`http://localhost:8000/api/history/${userId}`);
        expect(req.request.method).toBe("POST");
        expect(req.request.body).toEqual({ equation });
        req.flush({});
    });

    it("should send a GET request to fetch equations", () => {
        const userId = "123";

        service.getEquations(userId).subscribe(res => {
            expect(res).toBeTruthy();
        });

        const req = httpMock.expectOne(`http://localhost:8000/api/history/${userId}`);
        expect(req.request.method).toBe("GET");
        req.flush({});
    });
});
