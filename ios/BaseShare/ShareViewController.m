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
       }
     }];
  }
}

@end