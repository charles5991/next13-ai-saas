import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ImagePage = () => {
  return ( 
    <div>
      <Heading
        title="Photo Generator"
        description="Generate AI Photos"
        src="/photo.png"
      />
      <div className="px-4 lg:px-8">
        <Card className="bg-gray-100 border-0">
          <CardHeader>
            <CardTitle className="text-lg font-normal">
              Enter a detailed photo description
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-x-2 items-center">
            <Input placeholder="Taj Mahal in neon colours, cyberpunk" />
            <Button>Generate</Button>
          </CardContent>
        </Card>
      </div>
    </div>
   );
}
 
export default ImagePage;
