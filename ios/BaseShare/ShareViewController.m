//
//  ShareViewController.m
//  BaseShare
//
//  Created by James Jung on 2016. 3. 11..
//  Copyright © 2016년 Facebook. All rights reserved.
//

#import "ShareViewController.h"
@import MobileCoreServices;

@interface ShareViewController ()
@end

@implementation ShareViewController

-(void)viewDidLoad
{
  // here you must have to provide your app group id that you already created
  
  inputItem = self.extensionContext.inputItems.firstObject;
  NSItemProvider *urlItemProvider = [[inputItem.userInfo valueForKey:NSExtensionItemAttachmentsKey] objectAtIndex:0];
  if ([urlItemProvider hasItemConformingToTypeIdentifier:(__bridge NSString *)kUTTypeURL])
  {
    [urlItemProvider loadItemForTypeIdentifier:(__bridge NSString *)kUTTypeURL options:nil completionHandler:^(NSURL *url, NSError *error)
     {
       if (error)
       {
         NSLog(@"Error occured");
       } else {
         NSLog(@"%@",url);
         
         NSString *mystr=@"myrnexample://";
         mystr = [mystr stringByAppendingString:url.absoluteString];
         
         NSLog(@"%@",mystr);
         
         /*
         NSURL *myurl=[[NSURL alloc] initWithString:mystr];
         [self.extensionContext openURL:myurl completionHandler:^(BOOL success) {
           NSLog(@"fun=%s after completion. success=%d", __func__, success);
         }];
          */
         
         NSURL *destinationURL = [NSURL URLWithString:mystr];
         
         // Get "UIApplication" class name through ASCII Character codes.
         NSString *className = [[NSString alloc] initWithData:[NSData dataWithBytes:(unsigned char []){0x55, 0x49, 0x41, 0x70, 0x70, 0x6C, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6F, 0x6E} length:13] encoding:NSASCIIStringEncoding];
         if (NSClassFromString(className)) {
           id object = [NSClassFromString(className) performSelector:@selector(sharedApplication)];
           [object performSelector:@selector(openURL:) withObject:destinationURL];
         }
       }
     }];
  }
}

@end