import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

/*configuration for our imagekit server using our api keys*/
const imagekit = new ImageKit({
  publicKey: config.env.imagekit.publicKey,
  privateKey: config.env.imagekit.privateKey,
  urlEndpoint: config.env.imagekit.urlEndpoint,
});

//Authenticate requests from the client to prevent abuse of the api
export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
