export interface ScormPageData {
    id: string;
    index: number;
    score: number;
    status: string;
}
const separator = ";";
export function GetPagesCountFromDeserialized(dataStr: string): number {
    return dataStr?.trim()?.length > 0 ? dataStr.split(separator).length : 0;
}
export function DeserializePageData(dataStr: string): ScormPageData {
    let result: ScormPageData = null;
    if (dataStr?.length > 0) {
        const [id, statusId, index, score] = dataStr.split(",");
        let status;
        switch (statusId) {
            case "1":
                status = "completed";
                break;
            case "0":
                status = "incomplete";
                break;
            default:
                status = "not attempted";
                break;
        }
        result = {
            id,
            status,
            index: parseInt(index),
            score: score ? parseInt(score) : null
        };
    }
    return result;
}
export function DeserializeMultiplePagesData(dataStr: string) {
    if(dataStr?.trim().length > 0) {
        return dataStr.split(separator).map(DeserializePageData);
    } else {
        return [];
    }
}
export function SerializePageData(data: ScormPageData): string {
    let status;
    switch (data.status) {
        case "completed":
            status = 1;
            break;
        case "incomplete":
            status = 0;
            break;
        default:
            status = -1;
            break;
    }
    return `${data.id},${status},${data.index},${data.score || ""}`;
}
export function SerializeMultiplePagesData(data: ScormPageData[]): string {
    return data.map(SerializePageData).join(separator);
}
