export class EditItem {
  constructor(
    public productImgUrl: string,
    public atlasId: string,
    public desc: string,
    public booking: string,
    public um: string,
    public fullDesc: string,
    public category: string,
    public vendorImgUrl: string,
    public vendorName: string,
    public specData: any | []
  ) {}
}
