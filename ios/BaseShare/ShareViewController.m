#import "ShareViewController.h"
@import MobileCoreServices;

@interface ShareViewController ()
@end

@implementation ShareViewController

-(void)viewDidLoad
{
  
  [super viewDidLoad];
  __block NSString *urlStr=@"myrnexample://";
  
  inputItem = self.extensionContext.inputItems.firstObject;
  for (NSItemProvider *itemProvider in inputItem.attachments) {
    NSLog (@"%@", itemProvider);
    if ([itemProvider hasItemConformingToTypeIdentifier:(__bridge NSString *)kUTTypeURL]){
      [itemProvider loadItemForTypeIdentifier:(__bridge NSString *)kUTTypeURL options:nil completionHandler:^(NSURL *url, NSError *error)
       {
        
         urlStr = [urlStr stringByAppendingString:url.absoluteString];
         NSLog (@"%@", urlStr);
         
         destinationURL = [NSURL URLWithString:urlStr];
      }];
    }
  }
}

- (void)didSelectPost {
  NSString *className = [[NSString alloc] initWithData:[NSData dataWithBytes:(unsigned char []){0x55, 0x49, 0x41, 0x70, 0x70, 0x6C, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6F, 0x6E} length:13] encoding:NSASCIIStringEncoding];
  if (NSClassFromString(className)) {
    id object = [NSClassFromString(className) performSelector:@selector(sharedApplication)];
    [object performSelector:@selector(openURL:) withObject:destinationURL];
    [self.extensionContext completeRequestReturningItems:@[] completionHandler:nil];
  }
}

@end