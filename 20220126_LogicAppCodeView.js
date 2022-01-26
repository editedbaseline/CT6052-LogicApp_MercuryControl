{
    "definition": {
        "$schema": "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
        "actions": {
            "SendConfigOverSSH": {
                "inputs": {
                    "body": {
                        "hostname": "@triggerBody()?['hostname']",
                        "ip_prefix": "@triggerBody()?['ip_prefix']",
                        "loopback_id": "@triggerBody()?['loopback_id']",
                        "mask": "@triggerBody()?['mask']",
                        "ssh_port": "@triggerBody()?['ssh_port']"
                    },
                    "function": {
                        "id": "/subscriptions/fd347284-8825-4ed2-92ec-a8e8ee6eff79/resourceGroups/ct6052mercury2/providers/Microsoft.Web/sites/CT6052-Mercury/functions/SendConfigOverSSH"
                    },
                    "method": "POST"
                },
                "runAfter": {},
                "type": "Function"
            },
            "Switch": {
                "cases": {
                    "Case_-_200_success": {
                        "actions": {
                            "Send_an_email_(V2)_-_200_success": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>Please note that a new IP prefix has been added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nIn the unlikely event that this is a false positive, please report it to the NMC via your FLT.</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - NEW PREFIX BLOCKED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "case": 200
                    },
                    "Case_-_461_insufficient_JSON_parameters": {
                        "actions": {
                            "Send_an_email_(V2)_-_461_insufficient_JSON_parameters": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>ERROR ENCOUNTERED<br>\n<br>\nPlease note that your new IP prefix was <strong>NOT </strong>added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nThe error was that insufficient JSON parameters were passed to the Azure Function App. As this is controlled by the Azure Logic App it would suggest someone has made a change rather than user error.</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - ERROR ENCOUNTERED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "case": 461
                    },
                    "Case_-_462_incorrectly_formatted_JSON": {
                        "actions": {
                            "Send_an_email_(V2)_-_462_incorrectly_formatted_JSON": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>ERROR ENCOUNTERED<br>\n<br>\nPlease note that your new IP prefix was <strong>NOT </strong>added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nThe error was that the JSON parameters were incorrectly formatted when passed to the Azure Function App. As this is controlled by the Azure Logic App it would suggest someone has made a change rather than user error.</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - ERROR ENCOUNTERED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "case": 462
                    },
                    "Case_-_463_loopback_ID_out_of_range": {
                        "actions": {
                            "Send_an_email_(V2)_-_463_loopback_ID_out_of_range": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>ERROR ENCOUNTERED<br>\n<br>\nPlease note that your new IP prefix was <strong>NOT</strong> added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nThe error was the loopback ID provided to the Function App was either not a number, a number less than 1, or a number greater than 2,147,483,647. As this is auto-generated by the SharePoint List it would suggest someone has made a change rather than user error.</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - ERROR ENCOUNTERED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "case": 463
                    },
                    "Case_-_464_IP_prefix_not_valid": {
                        "actions": {
                            "Send_an_email_(V2)_-_464_IP_prefix_not_valid": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>ERROR ENCOUNTERED<br>\n<br>\nPlease note that your new IP prefix was <strong>NOT </strong>added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nThe error was the IP prefix provided. Check what you have put in above, is it a valid IPv4 address?</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - ERROR ENCOUNTERED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "case": 464
                    },
                    "Case_-_465_subnet_mask_not_valid": {
                        "actions": {
                            "Send_an_email_(V2)_-_465_subnet_mask_not_valid": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>ERROR ENCOUNTERED<br>\n<br>\nPlease note that your new IP prefix was <strong>NOT </strong>added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nThe error was the IP prefix provided. Check what you have put in above, is it a valid subnet mask such as 255.255.255.0? Note, CIDR values are not accepted.</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - ERROR ENCOUNTERED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "case": 465
                    },
                    "Case_-_466_host_bit_set": {
                        "actions": {
                            "Send_an_email_(V2)_-_466_host_bit_set": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>ERROR ENCOUNTERED<br>\n<br>\nPlease note that your new IP prefix was <strong>NOT </strong>added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nThe error was that the host bit was set on the prefix. The prefix needs to be the network address. For assistance with this issue, see a friendly network administrator for a lesson or read this <a href=\"https://www.computernetworkingnotes.com/networking-tutorials/ip-address-network-address-and-host-address-explained.html\">link </a>.</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - ERROR ENCOUNTERED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "case": 466
                    },
                    "Case_-_467_SSH_failure_username_or_password": {
                        "actions": {
                            "Send_an_email_(V2)_-_467_SSH_failure_username_or_password": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>ERROR ENCOUNTERED<br>\n<br>\nPlease note that your new IP prefix was <strong>NOT </strong>added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nThe error was an issue in the SSH communication issue between the Azure Function App and the NMC router. It seems the username or password was incorrect.</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - ERROR ENCOUNTERED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "case": 467
                    },
                    "Case_-_468_SSH_failure_connection": {
                        "actions": {
                            "Send_an_email_(V2)_-_468_SSH_failure_connection": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>ERROR ENCOUNTERED<br>\n<br>\nPlease note that your new IP prefix was NOT added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nThe error was a connection issue between the Azure Function App and the NMC router.</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - ERROR ENCOUNTERED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "case": 468
                    },
                    "Case_-_469_SSH_failure_timeout": {
                        "actions": {
                            "Send_an_email_(V2)_-_469_SSH_failure_timeout": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>ERROR ENCOUNTERED<br>\n<br>\nPlease note that your new IP prefix was NOT added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nThe error was a SSH communication timeout between the Azure Function App and the NMC router.</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - ERROR ENCOUNTERED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "case": 469
                    },
                    "Case_-_470_SSH_failure_unknown": {
                        "actions": {
                            "Send_an_email_(V2)_-_470_SSH_failure_unknown": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>ERROR ENCOUNTERED<br>\n<br>\nPlease note that your new IP prefix was <strong>NOT </strong>added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nThe error was an unknown SSH communication issue between the Azure Function App and the NMC router.</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - ERROR ENCOUNTERED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "case": 470
                    },
                    "Case_-_471_saving_to_NVRAM_failure": {
                        "actions": {
                            "Send_an_email_(V2)_-_471_notification_to_users": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>Please note that a new IP prefix has been added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nIn the unlikely event that this is a false positive, please report it to the NMC via your FLT.</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - NEW PREFIX BLOCKED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {
                                    "Send_an_email_(V2)_-_471_saving_to_NVRAM_failure": [
                                        "Succeeded"
                                    ]
                                },
                                "type": "ApiConnection"
                            },
                            "Send_an_email_(V2)_-_471_saving_to_NVRAM_failure": {
                                "inputs": {
                                    "body": {
                                        "Body": "<p>ERROR ENCOUNTERED<br>\n<br>\nPlease note that your new IP prefix was added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nHowever, there was an error when saving the configuration to the NVRAM. This means that if the NMC router is rebooted this prefix will be lost. It is advised that someone SSH's on to the router to manually run \"wri mem\" or \"copy r s\". If that fails it should give them an indication of the underlying issue. If that works, it suggests an issue in Mercury.</p>",
                                        "Importance": "High",
                                        "Subject": "MERCURY - ERROR ENCOUNTERED",
                                        "To": "s1909313@connect.glos.ac.uk"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['office365']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v2/Mail"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "case": 471
                    }
                },
                "default": {
                    "actions": {
                        "Send_an_email_(V2)_4": {
                            "inputs": {
                                "body": {
                                    "Body": "<p>ERROR ENCOUNTERED<br>\n<br>\nPlease note that your new IP prefix was NOT added to the national block list via Mercury. The details of this prefix are as follows:<br>\n<br>\nNetwork: @{triggerBody()?['ip_prefix']}<br>\nMask: @{triggerBody()?['mask']}<br>\n<br>\nThe error is unknown. The response code is one that is not covered by the Logic App.</p>",
                                    "Importance": "High",
                                    "Subject": "MERCURY - ERROR ENCOUNTERED",
                                    "To": "s1909313@connect.glos.ac.uk"
                                },
                                "host": {
                                    "connection": {
                                        "name": "@parameters('$connections')['office365']['connectionId']"
                                    }
                                },
                                "method": "post",
                                "path": "/v2/Mail"
                            },
                            "runAfter": {},
                            "type": "ApiConnection"
                        }
                    }
                },
                "expression": "@outputs('SendConfigOverSSH')['statusCode']",
                "runAfter": {
                    "SendConfigOverSSH": [
                        "Succeeded",
                        "Failed"
                    ]
                },
                "type": "Switch"
            }
        },
        "contentVersion": "1.0.0.0",
        "outputs": {},
        "parameters": {
            "$connections": {
                "defaultValue": {},
                "type": "Object"
            }
        },
        "triggers": {
            "manual": {
                "inputs": {
                    "method": "POST",
                    "schema": {
                        "properties": {
                            "hostname": {
                                "type": "string"
                            },
                            "ip_prefix": {
                                "type": "string"
                            },
                            "loopback_id": {
                                "type": "string"
                            },
                            "mask": {
                                "type": "string"
                            },
                            "ssh_port": {
                                "type": "string"
                            }
                        },
                        "type": "object"
                    }
                },
                "kind": "Http",
                "type": "Request"
            }
        }
    },
    "parameters": {
        "$connections": {
            "value": {
                "office365": {
                    "connectionId": "/subscriptions/fd347284-8825-4ed2-92ec-a8e8ee6eff79/resourceGroups/ct6052mercury2-la/providers/Microsoft.Web/connections/office365",
                    "connectionName": "office365",
                    "id": "/subscriptions/fd347284-8825-4ed2-92ec-a8e8ee6eff79/providers/Microsoft.Web/locations/uksouth/managedApis/office365"
                }
            }
        }
    }
}